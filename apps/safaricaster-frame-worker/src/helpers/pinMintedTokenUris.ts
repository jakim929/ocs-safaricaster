import type { Bindings } from "@/Bindings";
import { getPublicClient } from "@/helpers/getPublicClient";
import {
	getContractIndexingState,
	upsertContractIndexingStates,
} from "@/models/contractIndexingStates";
import { createKysely } from "@/models/kyselyD1";
import { type Address, parseAbiItem } from "viem";

export const pinMintedTokenUris = async (bindings: Bindings) => {
	const publicClient = getPublicClient(bindings);
	const db = createKysely(bindings.SAFARICASTER_D1_DATABASE);

	const contractIndexingState = await getContractIndexingState(db, {
		chainId: bindings.CHAIN_ID,
		address: bindings.NFT_CONTRACT_ADDRESS,
	});

	const fromBlockNumber =
		(contractIndexingState ? BigInt(contractIndexingState.blockNumber) : 0n) +
		1n;

	const toBlockNumber = await publicClient.getBlockNumber();

	const logs = await publicClient.getLogs({
		event: parseAbiItem(
			"event Minted(address to, uint256 tokenId, string tokenUri)",
		),
		address: bindings.NFT_CONTRACT_ADDRESS as Address,
		fromBlock: fromBlockNumber,
		toBlock: toBlockNumber,
	});

	// Pinning operation should be idempotent
	await Promise.all(
		logs.map(async ({ args }) => {
			const { to, tokenUri, tokenId } = args;

			if (!to || !tokenUri || !tokenId) {
				return;
			}

			if (
				bindings.ENVIRONMENT === "development" &&
				!tokenUri.startsWith("ipfs://")
			) {
				// since we have some random token uris for our test contracts
				return;
			}
			// the host can be anything
			await bindings.IPFS_STORAGE_WORKER.fetch(
				"https://something.invalid/pinNftMetadata",
				{
					method: "POST",
					body: JSON.stringify({ tokenUri }),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}),
	).catch((e) => {
		console.error(e);
	});

	await upsertContractIndexingStates(db, {
		id: contractIndexingState?.id || undefined,
		chainId: bindings.CHAIN_ID,
		address: bindings.NFT_CONTRACT_ADDRESS,
		blockNumber: Number(toBlockNumber),
	});

	// match tokenUri from mintPermits to get FID and insert into mints table
};
