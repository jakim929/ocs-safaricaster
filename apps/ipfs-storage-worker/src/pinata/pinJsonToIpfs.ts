import type { Bindings } from "@/Bindings";
import { pinResponseSchema } from "@/pinata/pinResponseSchema";
import type { Json } from "@/schemas/jsonSchema";
import stringify from "json-stringify-deterministic";

export const pinJsonToIpfs = async (bindings: Bindings, json: Json) => {
	const fetchResult = await fetch(
		"https://api.pinata.cloud/pinning/pinJSONToIPFS",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${bindings.PINATA_API_JWT}`,
				"Content-Type": "application/json",
			},
			body: stringify({
				pinataContent: json,
			}),
		},
	);

	if (!fetchResult.ok) {
		throw new Error(
			`Failed to pin JSON to IPFS ${fetchResult.status}: ${fetchResult.statusText}`,
		);
	}

	const result = await fetchResult.json();

	const { IpfsHash } = pinResponseSchema.parse(result);

	return IpfsHash;
};
