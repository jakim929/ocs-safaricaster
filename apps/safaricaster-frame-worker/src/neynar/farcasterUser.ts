import type { Bindings } from "@/Bindings";
import { chunkProcess } from "@/utils/chunkProcess";
import { z } from "zod";

export const neynarFarcasterUserSchema = z.object({
	fid: z.number(),
	username: z.string(),
	display_name: z.string(),
	pfp_url: z.string(),
	power_badge: z.boolean(),
});

export type NeynarFarcasterUser = z.infer<typeof neynarFarcasterUserSchema>;

const endpointResponseSchema = z.object({
	users: z.array(neynarFarcasterUserSchema).min(1),
});

export const getFarcasterUsers = async (bindings: Bindings, fids: number[]) => {
	// endpoint only supports 100 fids at a time
	return await chunkProcess(fids, 100, async (fidsChunk) => {
		const result = await fetch(
			`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fidsChunk.join(
				",",
			)}`,
			{
				headers: {
					accept: "application/json",
					api_key: bindings.NEYNAR_API_KEY,
				},
			},
		);

		return endpointResponseSchema
			.transform(({ users }) => {
				return users;
			})
			.parse(await result.json());
	});
};
