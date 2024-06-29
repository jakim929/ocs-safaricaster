// read/write functions for screenshots table
import type { KyselyDatabase, ScreenshotsInKysely } from "@/models/kyselyD1";
import type { Insertable } from "kysely";

export const createScreenshot = async (
	db: KyselyDatabase,
	screenshot: Insertable<ScreenshotsInKysely>,
) => {
	await db.insertInto("screenshots").values(screenshot).execute();
	return screenshot;
};

export const getScreenshot = async (
	db: KyselyDatabase,
	screenshotId: string,
) => {
	const screenshots = await db
		.selectFrom("screenshots")
		.selectAll()
		.where("id", "=", screenshotId)
		.limit(1)
		.execute();

	if (screenshots.length === 0) {
		return null;
	}

	return screenshots[0];
};

export const markScreenshotAsCached = async (
	db: KyselyDatabase,
	screenshotId: string,
) => {
	await db
		.updateTable("screenshots")
		.set({ areTransformationsCached: true })
		.where("id", "=", screenshotId)
		.execute();
};

export const getMostRecentCachedScreenshot = async (db: KyselyDatabase) => {
	const screenshots = await db
		.selectFrom("screenshots")
		.selectAll()
		.orderBy("timestamp", "desc")
		.where("areTransformationsCached", "=", true)
		.limit(1)
		.execute();

	if (screenshots.length === 0) {
		return null;
	}
	return screenshots[0];
};
