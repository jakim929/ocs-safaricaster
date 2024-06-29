import type { MiddlewareHandler } from "hono";
import type { Bindings } from "@/Bindings";
import { z } from "zod";
import { neynarFarcasterUserSchema } from "@/neynar/farcasterUser";
import { getLocalFarcasterUserStore } from "@/local-store/getLocalFarcasterUserStore";

export const neynarFrameValidateResponseSchema = z.object({
	valid: z.boolean(),
	action: z.object({
		interactor: neynarFarcasterUserSchema,
	}),
});

export type NeynarFrameValidateResponse = z.infer<
	typeof neynarFrameValidateResponseSchema
>;

// throws error if not verified
export const withFrameVerification: MiddlewareHandler<{
	Bindings: Bindings;
}> = async (c, next) => {
	if (c.env.ENVIRONMENT === "development") {
		await next();
		return;
	}

	if (c.req.method !== "POST") {
		await next();
		return;
	}

	const data = await c.req.json().catch(() => null);

	if (!data) {
		throw Error("No frame message");
	}

	const result = await fetch(
		"https://api.neynar.com/v2/farcaster/frame/validate",
		{
			method: "POST",
			headers: {
				accept: "application json",
				api_key: c.env.NEYNAR_API_KEY,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				message_bytes_in_hex: `0x${data.trustedData.messageBytes}`,
				signer_context: true,
			}),
		},
	).then(async (res) => res.json());

	const parseResult = neynarFrameValidateResponseSchema.safeParse(result);

	if (parseResult.success === false) {
		throw Error("Failed to parse frame validation response", parseResult.error);
	}

	const { action, valid } = parseResult.data;

	getLocalFarcasterUserStore(c.env).save(
		action.interactor.fid,
		action.interactor,
	);

	if (!valid) {
		throw Error("Frame message verification failed");
	}

	await next();
};
