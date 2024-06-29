import type { Bindings } from "@/Bindings";
import { animalById, type AnimalId } from "@/constants/animalById";
import { createKysely } from "@/models/kyselyD1";
import { getScreenshot } from "@/models/screenshots";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { ImageResponse, loadGoogleFont } from "hono-og";
import { NftImageCanvas } from "./NftImageCanvas";

export const getNftScreenshotLayerStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "nft-base-template",
		// if you want to always regenerate the image, set this to true
		// shouldAlwaysRegenerate: true,
		keyFn: (screenshotId: string) => {
			return `${screenshotId}.png`;
		},
		operationFn: async (screenshotId: string) => {
			const screenshot = await getScreenshot(
				createKysely(bindings.SAFARICASTER_D1_DATABASE),
				screenshotId,
			);
			if (!screenshot) {
				throw new Error(`No screenshot found for id ${screenshotId}`);
			}

			const animal = animalById[screenshot.animalId as AnimalId];
			const baseImageUrl = animal.baseImage;
			const animalName = animal.name;

			const timestamp = screenshot.timestamp;
			const livestreamScreenshotUrl = `${bindings.SAFARICASTER_R2_BUCKET_BASE_URL}/${screenshot.imageObjectKey}`;

			const imageResponse = new ImageResponse(
				<NftImageCanvas
					animalName={animalName}
					baseImageUrl={baseImageUrl}
					livestreamScreenshotUrl={livestreamScreenshotUrl}
					timestamp={timestamp}
				/>,
				{
					fonts: [
						{
							name: "Ubuntu Mono",
							data: await loadGoogleFont({
								family: "Ubuntu Mono",
								weight: 400,
							}),
							weight: 400,
						},
						{
							name: "Ubuntu Mono",
							data: await loadGoogleFont({
								family: "Ubuntu Mono",
								weight: 700,
							}),
							weight: 700,
						},
						{
							name: "Rubik Mono One",
							data: await loadGoogleFont({
								family: "Rubik Mono One",
								weight: 400,
							}),
							weight: 400,
						},
					],
					width: 1024,
					height: 1024,
				},
			);

			const imageArrayBuffer = await imageResponse.arrayBuffer();

			return imageArrayBuffer;
		},
	});
};
