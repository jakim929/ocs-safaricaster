// interface for the screenshots table
import type { AnimalId } from "@/constants/animalById";
import type { D1Database } from "@cloudflare/workers-types";
import { CamelCasePlugin, type ColumnType, Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { Address } from "viem";

export type ScreenshotsInKysely = {
	id: string;
	imageObjectKey: string;
	animalId?: AnimalId;
	timestamp: number;
	areTransformationsCached: boolean;
	createdAt: ColumnType<number, never, never>;
	updatedAt: ColumnType<number, never, number | undefined>;
};

export type ViewsInKysely = {
	id: string;
	screenshotId: string;
	fid: number;
	createdAt: ColumnType<number, never, never>;
	updatedAt: ColumnType<number, never, number | undefined>;
};

export type MintPermitsInKysely = {
	id: string;
	screenshotId: string;
	animalId: string | undefined;
	fid: number;
	chainId: string;
	recipient: Address;
	nonce: string;
	signature: string;
	imageObjectKey: string;
	tokenUri: string;
	createdAt: ColumnType<number, never, never>;
	updatedAt: ColumnType<number, never, number | undefined>;
};

// Do we need: screenshotId, imageObjectKey, chainId?
export type MintsInKysely = {
	id: string;
	screenshotId: string;
	imageObjectKey: string;
	fid: number;
	chainId: string;
	recipient: Address;
	transactionHash: string;
	tokenId: string;
	tokenUri: string;
	createdAt: ColumnType<number, never, never>;
	updatedAt: ColumnType<number, never, number | undefined>;
};

export type ContractIndexingStatesInKysely = {
	id: string;
	chainId: string;
	address: string;
	blockNumber: number;
	createdAt: ColumnType<number, never, never>;
	updatedAt: ColumnType<number, never, number | undefined>;
};

export type Database = {
	screenshots: ScreenshotsInKysely;
	views: ViewsInKysely;
	mintPermits: MintPermitsInKysely;
	contractIndexingStates: ContractIndexingStatesInKysely;
};

export type KyselyDatabase = Kysely<Database>;

export function createKysely(d1: D1Database): KyselyDatabase {
	return new Kysely<Database>({
		dialect: new D1Dialect({ database: d1 }),
		plugins: [new CamelCasePlugin()],
	});
}
