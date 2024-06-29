import type { Bindings } from "@/Bindings";
import { pinResponseSchema } from "@/pinata/pinResponseSchema";

export const pinFileToIpfs = async (bindings: Bindings, blob: Blob) => {
	const form = new FormData();
	form.append("file", blob);

	const fetchResult = await fetch(
		"https://api.pinata.cloud/pinning/pinFileToIPFS",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${bindings.PINATA_API_JWT}`,
			},
			body: form,
		},
	);

	if (!fetchResult.ok) {
		throw new Error(
			`Failed to pin file to IPFS ${fetchResult.status}: ${fetchResult.statusText}`,
		);
	}

	const { IpfsHash } = pinResponseSchema.parse(await fetchResult.json());

	return IpfsHash;
};
