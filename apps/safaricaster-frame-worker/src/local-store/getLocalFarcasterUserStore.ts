import type { Bindings } from "@/Bindings";
import {
	getFarcasterUsers,
	type NeynarFarcasterUser,
} from "@/neynar/farcasterUser";

const cache: Record<number, NeynarFarcasterUser> = {};

export const getLocalFarcasterUserStore = (bindings: Bindings) => {
	return {
		get: async (fid: number) => {
			if (cache[fid]) {
				return cache[fid];
			}

			const [user] = await getFarcasterUsers(bindings, [fid]);
			cache[fid] = user;

			return user;
		},

		getMany: async (fids: number[]) => {
			const missingFids = fids.filter((fid) => !cache[fid]);

			if (missingFids.length) {
				const users = await getFarcasterUsers(bindings, missingFids);
				users.forEach((user, i) => {
					cache[user.fid] = user;
				});
			}

			return fids.map((fid) => {
				const user = cache[fid];
				if (!user) {
					return null; // or some default value
				}
				return user;
			});
		},

		save: (fid: number, user: NeynarFarcasterUser) => {
			cache[fid] = user;
		},
	};
};
