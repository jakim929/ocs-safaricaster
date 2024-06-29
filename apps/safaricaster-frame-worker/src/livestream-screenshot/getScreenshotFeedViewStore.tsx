import type { Bindings } from "@/Bindings";
import { createKysely } from "@/models/kyselyD1";
import { getScreenshot } from "@/models/screenshots";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { overlayImage } from "@/helpers/overlayImage";
import { centerCropImage } from "@/helpers/centerCropImage";

// get rid of the extra use of Satori
export const getScreenshotFeedViewStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "screenshot-feed-view",
		// if you want to always regenerate the image, set this to true
		// shouldAlwaysRegenerate: true,
		keyFn: ({ screenshotId }: { screenshotId: string }) => {
			return `${[screenshotId].join("-")}`;
		},
		operationFn: async ({ screenshotId }: { screenshotId: string }) => {
			const screenshot = await getScreenshot(
				createKysely(bindings.SAFARICASTER_D1_DATABASE),
				screenshotId,
			);

			if (!screenshot) {
				throw new Error(`No screenshot found for id ${screenshotId}`);
			}

			const imageUrl = `${bindings.SAFARICASTER_R2_BUCKET_BASE_URL}/${screenshot.imageObjectKey}`;

			const image = await fetch(imageUrl).then((res) => res.arrayBuffer());

			const overlayFigma = await fetch(
				"https://i.ibb.co/FbJXwCh/Frame-10122612-1.png",
			).then((res) => res.arrayBuffer());

			return await overlayImage(
				centerCropImage(image, 1910, 1000),
				overlayFigma,
			);
		},
	});
};
