import type { KyselyDatabase, MintPermitsInKysely } from "@/models/kyselyD1";
import type { Insertable } from "kysely";

export const createMintPermit = async (
	db: KyselyDatabase,
	mintPermit: Omit<Insertable<MintPermitsInKysely>, "id">,
) => {
	await db
		.insertInto("mintPermits")
		.values({
			...mintPermit,
			id: crypto.randomUUID(),
		})
		.execute();
};

export const getMintPermitForTokenUri = async (
	db: KyselyDatabase,
	tokenUri: string,
) => {
	const mintPermits = await db
		.selectFrom("mintPermits")
		.selectAll()
		.where("tokenUri", "=", tokenUri)
		.limit(1)
		.execute();

	if (mintPermits.length === 0) {
		return null;
	}

	return mintPermits[0];
};
