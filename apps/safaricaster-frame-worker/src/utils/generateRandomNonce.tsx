import { bytesToBigInt } from "viem";
import crypto from "node:crypto";

// Generate a random nonce
export const generateRandomNonce = (): bigint => {
	return bytesToBigInt(crypto.randomBytes(16));
};
