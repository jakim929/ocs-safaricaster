import { type Hex, parseSignature } from "viem";

export const parseSignatureIntoVrs = (signature: Hex) => {
	const { r, s, yParity } = parseSignature(signature);
	const v = yParity + 27;

	return { v, r, s };
};
