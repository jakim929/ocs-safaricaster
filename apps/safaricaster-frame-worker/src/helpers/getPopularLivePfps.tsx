import { getFidsWithRecentViews } from "@/models/views";
import { createKysely } from "@/models/kyselyD1";
import type { Bindings } from "@/Bindings";
import { getLocalFarcasterUserStore } from "@/local-store/getLocalFarcasterUserStore";

export const getPopularLivePfps = async (bindings: Bindings) => {
	const fidsWithRecentViews = await getFidsWithRecentViews(
		createKysely(bindings.SAFARICASTER_D1_DATABASE),
	);

	// include 611 and 1043, 123, and 144 in fidsWithRecentViews
	fidsWithRecentViews.push(611, 1043, 123, 144);
	// get PFP urls for every fid, pass in string []

	// filter out unique fids
	const uniqueFids = [...new Set(fidsWithRecentViews)];

	const localFarcasterUserStore = getLocalFarcasterUserStore(bindings);
	const pfpUrls = await localFarcasterUserStore
		.getMany(uniqueFids)
		.then((users) => users.map((user) => user.pfp_url));

	return pfpUrls;
};
