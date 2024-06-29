import type { KyselyDatabase, ViewsInKysely } from "@/models/kyselyD1";
import type { Insertable } from "kysely";

export const createView = async (
	db: KyselyDatabase,
	view: Omit<Insertable<ViewsInKysely>, "id">,
) => {
	await db
		.insertInto("views")
		.values({
			...view,
			id: crypto.randomUUID(),
		})
		.execute();
};

export const getDidUserViewScreenshot = async (
	db: KyselyDatabase,
	fid: number,
	screenshotId: string,
) => {
	const views = await db
		.selectFrom("views")
		.selectAll()
		.where("fid", "=", fid)
		.where("screenshotId", "=", screenshotId)
		.limit(1)
		.execute();
	return views.length > 0;
};
// get a list of all fids that have a view row in the last 30 seconds
export const getFidsWithRecentViews = async (db: KyselyDatabase) => {
	const thirtySecondsAgo = Date.now() - 30000;

	const views = await db
		.selectFrom("views")
		.selectAll()
		.where("createdAt", ">", thirtySecondsAgo)
		.execute();

	return [...new Set(views.map((view) => view.fid))];
};

// TODO: Function to check top 1000 most followed, otherwise take random
