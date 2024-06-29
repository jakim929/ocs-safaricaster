import type { Bindings } from "@/Bindings";
import { pinFileToIpfs } from "@/pinata/pinFileToIpfs";
import { pinJsonToIpfs } from "@/pinata/pinJsonToIpfs";
import { tokenMetadataSchema } from "@/schemas/tokenMetadata";
import { z } from "zod";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { cidFromUri, uriFromCid } from "@/ipfs/utils";
import { calculateCid, calculateJsonCid } from "@/ipfs/cid";
import stringify from "json-stringify-deterministic";
import { createJsonStringSchema } from "@/schemas/createJsonStringSchema";

const tokenMetadataWithoutImage = tokenMetadataSchema.omit({
	image: true,
});

const app = new Hono<{ Bindings: Bindings }>();

app.post(
	"/registerNftMetadata",
	zValidator(
		"form",
		z.object({
			imageFile: z.instanceof(File), // don't do any advanced validation here
			tokenMetadata: createJsonStringSchema(tokenMetadataWithoutImage),
		}),
	),
	async (c) => {
		const { imageFile, tokenMetadata } = c.req.valid("form");

		const { tokenUri } = await registerNftMetadata(
			c.env,
			await imageFile.arrayBuffer(),
			tokenMetadata,
		);

		return c.json({
			tokenUri,
		});
	},
);

app.post(
	"/pinNftMetadata",
	zValidator(
		"json",
		z.object({
			tokenUri: z.string(),
		}),
	),
	async (c) => {
		const { tokenUri } = c.req.valid("json");

		await pinNftMetadata(c.env, c.executionCtx, tokenUri);

		return c.json({ success: true });
	},
);

async function registerNftMetadata(
	bindings: Bindings,
	imageFile: ArrayBuffer,
	tokenMetadata: z.infer<typeof tokenMetadataWithoutImage>,
) {
	const { cidv0: imageCid } = await calculateCid(new Uint8Array(imageFile));
	await bindings.IPFS_STORAGE_CACHE_BUCKET.put(imageCid, imageFile);

	const metadata = {
		...tokenMetadata,
		image: uriFromCid(imageCid),
	};

	const { cidv0: metadataCid } = await calculateJsonCid(metadata);
	await bindings.IPFS_STORAGE_CACHE_BUCKET.put(
		metadataCid,
		stringify(metadata),
	);

	return {
		tokenUri: uriFromCid(metadataCid),
	};
}

async function pinNftMetadata(
	bindings: Bindings,
	ctx: ExecutionContext,
	tokenUri: string,
) {
	const metadataCid = cidFromUri(tokenUri);
	const metadataObject =
		await bindings.IPFS_STORAGE_CACHE_BUCKET.get(metadataCid);

	if (!metadataObject) {
		// throw new Error(`Metadata with CID ${metadataCid} not found`);
		// TODO decide if we should throw this error
		return;
	}

	const metadata = tokenMetadataSchema.parse(await metadataObject.json());

	const imageCid = cidFromUri(metadata.image);
	const imageObject = await bindings.IPFS_STORAGE_CACHE_BUCKET.get(imageCid);

	if (!imageObject) {
		throw new Error(`Image with CID ${metadata.image} not found`);
	}

	const [returnedImageCid, returnedMetadataCid] = await Promise.all([
		pinFileToIpfs(bindings, await imageObject.blob()),
		pinJsonToIpfs(bindings, metadata),
	]);

	if (returnedImageCid !== imageCid) {
		throw new Error(
			`Image CID mismatch: expected ${imageCid}, got ${returnedImageCid}`,
		);
	}

	if (returnedMetadataCid !== metadataCid) {
		throw new Error(
			`Metadata CID mismatch: expected ${metadataCid}, got ${returnedMetadataCid}`,
		);
	}
}

export default {
	fetch: app.fetch,
};
