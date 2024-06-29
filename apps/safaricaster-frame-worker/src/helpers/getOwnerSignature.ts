import type { Bindings } from "@/Bindings";
import type { Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const getDomain = (bindings: Bindings) => {
	return {
		name: "Erc721WithCustomTokenUri",
		version: "1",
		chainId: Number(bindings.CHAIN_ID),
		verifyingContract: bindings.NFT_CONTRACT_ADDRESS as Address,
	};
};

export async function getOwnerSignature(
	bindings: Bindings,
	issuance: {
		tokenUri: string;
		recipient: Address;
		nonce: bigint;
	},
) {
	const account = privateKeyToAccount(bindings.OWNER_PRIVATE_KEY);

	const types = {
		Issuance: [
			{ name: "tokenUri", type: "string" },
			{ name: "recipient", type: "address" },
			{ name: "nonce", type: "uint256" },
		],
	};

	const message = {
		tokenUri: issuance.tokenUri,
		recipient: issuance.recipient,
		nonce: issuance.nonce,
	};

	const signature = await account.signTypedData({
		domain: getDomain(bindings),
		types,
		primaryType: "Issuance",
		message,
	});

	return signature;
}
