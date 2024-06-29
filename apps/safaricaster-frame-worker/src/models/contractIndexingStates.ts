import type { KyselyDatabase } from "@/models/kyselyD1";

export const upsertContractIndexingStates = async (
	db: KyselyDatabase,
	{
		id,
		chainId,
		address,
		blockNumber,
	}: {
		id?: string;
		chainId: string;
		address: string;
		blockNumber: number;
	},
) => {
	await db
		.insertInto("contractIndexingStates")
		.values({
			id: id || crypto.randomUUID(),
			chainId,
			address,
			blockNumber,
		})
		.onConflict((oc) => oc.doUpdateSet({ blockNumber, updatedAt: Date.now() }))
		.execute();
};

export const getContractIndexingState = async (
	db: KyselyDatabase,
	{
		chainId,
		address,
	}: {
		chainId: string;
		address: string;
	},
) => {
	const contractIndexingStates = await db
		.selectFrom("contractIndexingStates")
		.selectAll()
		.where("chainId", "=", chainId)
		.where("address", "=", address)
		.limit(1)
		.execute();

	if (contractIndexingStates.length === 0) {
		return null;
	}

	return contractIndexingStates[0];
};
