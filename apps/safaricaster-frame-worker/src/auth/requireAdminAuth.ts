import type { Bindings } from "@/Bindings";
import type { Context } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { z } from "zod";

const JWT_PARAMS = {
	algorithm: "ES256",
};

const jwtPayloadSchema = z.object({
	isAdmin: z.boolean(),
	name: z.string(),
});

export const requireAdminAuth = bearerAuth({
	verifyToken: async (token, c: Context<{ Bindings: Bindings }>) => {
		const isValid = await jwt.verify(
			token,
			c.env.ADMIN_JWT_SIGNER_PUBLIC_KEY,
			JWT_PARAMS,
		);

		if (!isValid) {
			return false;
		}

		const decodedJwt = await jwt.decode(token);

		const jwtPayloadParseResult = jwtPayloadSchema.safeParse(
			decodedJwt.payload,
		);

		if (!jwtPayloadParseResult.success) {
			return false;
		}

		return jwtPayloadParseResult.data.isAdmin;
	},
});
