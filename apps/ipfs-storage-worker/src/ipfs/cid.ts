import { unixfs } from "@helia/unixfs";
import { BlackHoleBlockstore } from "blockstore-core/black-hole";
import { fixedSize } from "ipfs-unixfs-importer/chunker";
import { balanced } from "ipfs-unixfs-importer/layout";

import type { Json } from "@/schemas/jsonSchema";
import stringify from "json-stringify-deterministic";

export const calculateCid = async (bytes: Uint8Array) => {
	const unixFs = unixfs({
		blockstore: new BlackHoleBlockstore(),
	});

	const cid = await unixFs.addBytes(bytes, {
		cidVersion: 0,
		rawLeaves: false,
		leafType: "file",
		layout: balanced({
			maxChildrenPerNode: 174,
		}),
		chunker: fixedSize({
			chunkSize: 262144,
		}),
	});

	const cidv0 = cid.toV0().toString(); // QmPK1s...
	const cidv1 = cid.toV1().toString(); // b45165...

	return {
		cidv0,
		cidv1,
	};
};

export const calculateJsonCid = async (json: Json) => {
	const textEncoder = new TextEncoder();
	const bytes = textEncoder.encode(stringify(json));

	return calculateCid(bytes);
};
