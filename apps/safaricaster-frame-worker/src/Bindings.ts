import type { Job } from "@/queue/Queue";
import type { Hex } from "viem";

export type Bindings = {
	// Env vars
	ENVIRONMENT: "development" | "production";
	BASE_URL: string;
	SAFARICASTER_R2_BUCKET_BASE_URL: string;
	ADMIN_JWT_SIGNER_PUBLIC_KEY: string;
	CHAIN_RPC_URL: string;
	CHAIN_ID: string;
	NFT_CONTRACT_ADDRESS: string;
	FROG_SECRET: string;
	NEYNAR_API_KEY: string;
	OWNER_PRIVATE_KEY: Hex;
	OPENAI_API_KEY: string;

	// Cloudflare bindings
	IPFS_STORAGE_WORKER: Service;
	SAFARICASTER_R2_BUCKET: R2Bucket;
	SAFARICASTER_D1_DATABASE: D1Database;
	QUEUE: Queue<Job>;
};
