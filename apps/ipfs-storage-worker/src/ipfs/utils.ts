export const cidFromUri = (uri: string): string => {
	if (!uri.startsWith("ipfs://")) {
		throw new Error(`Invalid URI: ${uri}`);
	}

	return uri.slice("ipfs://".length);
};

export const uriFromCid = (cid: string): string => {
	return `ipfs://${cid}`;
};
