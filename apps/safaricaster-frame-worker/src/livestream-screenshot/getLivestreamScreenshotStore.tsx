import type { Bindings } from "@/Bindings";
import { animalById, type AnimalId } from "@/constants/animalById";
import { LivestreamScreenshot } from "@/livestream-screenshot/LivestreamScreenshot";
import { createKysely } from "@/models/kyselyD1";
import { getScreenshot } from "@/models/screenshots";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { ImageResponse, loadGoogleFont } from "hono-og";
import { getPopularLivePfps } from "@/helpers/getPopularLivePfps";

export const getLivestreamScreenshotStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "livestream-screenshot",
		keyFn: ({ screenshotId }: { screenshotId: string }) => {
			return `${screenshotId}.png`;
		},
		operationFn: async ({ screenshotId }: { screenshotId: string }) => {
			const screenshot = await getScreenshot(
				createKysely(bindings.SAFARICASTER_D1_DATABASE),
				screenshotId,
			);

			if (!screenshot) {
				throw new Error(`No screenshot found for id ${screenshotId}`);
			}

			const popularLivePfps = await getPopularLivePfps(bindings);
			const imageUrl = `${bindings.SAFARICASTER_R2_BUCKET_BASE_URL}/${screenshot.imageObjectKey}`;

			const animal = screenshot.animalId
				? animalById[screenshot.animalId as AnimalId]
				: null;

			const imageResponse = await new ImageResponse(
				<LivestreamScreenshot
					imageUrl={imageUrl}
					animalName={animal?.name || null}
					pfpUrls={popularLivePfps}
				/>,
				{
					fonts: [
						{
							name: "Ubuntu Mono",
							data: await loadGoogleFont({
								family: "Ubuntu Mono",
								weight: 400,
							}),
						},
					],
					width: 1910,
					height: 1000,
				},
			);

			return await imageResponse.arrayBuffer();
		},
	});
};
