import type { Bindings } from "@/Bindings";
import { animalById, type AnimalId } from "@/constants/animalById";
import { createKysely } from "@/models/kyselyD1";
import { getScreenshot } from "@/models/screenshots";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { ImageResponse, loadGoogleFont } from "hono-og";
import { getNftScreenshotLayerStore } from "@/nft-image/getNftScreenshotLayerStore";
import { NftImagePersonalizedOverlay } from "@/nft-image/NftImagePersonalizedOverlay";
import { overlayImage } from "@/helpers/overlayImage";

import { getLocalFarcasterUserStore } from "@/local-store/getLocalFarcasterUserStore";

const getIdHashtag = (fid: number, timestamp: number) => {
	return `#${fid}-${Math.floor(timestamp / 1000)}`;
};

const getPersonalizedOverlay = async (
	bindings: Bindings,
	screenshotId: string,
	fid: number,
) => {
	const screenshot = await getScreenshot(
		createKysely(bindings.SAFARICASTER_D1_DATABASE),
		screenshotId,
	);
	if (!screenshot) {
		throw new Error(`No screenshot found for id ${screenshotId}`);
	}

	if (!screenshot.animalId) {
		throw new Error(`No animal found for screenshot ${screenshotId}`);
	}

	const localFarcasterUserStore = getLocalFarcasterUserStore(bindings);
	const farcasterUser = await localFarcasterUserStore.get(fid);
	const farcasterName = farcasterUser.username;

	const animalName =
		animalById[screenshot.animalId as AnimalId].name.toLowerCase();

	screenshot.timestamp;

	const imageResponse = await new ImageResponse(
		<NftImagePersonalizedOverlay
			idHashtag={getIdHashtag(fid, Math.floor(screenshot.timestamp / 1000))}
			// TODO fix A vs An and remove wild
			description={`A wild ${animalName} was spotted by **${farcasterName}** (FID #${fid}) on Warpcast.`}
			username={farcasterName}
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

	return await imageResponse.arrayBuffer();
};

export const getNftImageStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "nft-image",
		// if you want to always regenerate the image, set this to true
		// shouldAlwaysRegenerate: true,
		keyFn: ({ screenshotId, fid }: { screenshotId: string; fid: number }) => {
			return `${[screenshotId, fid].join("-")}`;
		},
		operationFn: async ({
			screenshotId,
			fid,
		}: { screenshotId: string; fid: number }) => {
			const nftBaseTemplateStore = getNftScreenshotLayerStore(bindings);

			const baseTemplate = await nftBaseTemplateStore.get(screenshotId);

			const personalizedOverlay = await getPersonalizedOverlay(
				bindings,
				screenshotId,
				fid,
			);

			return await overlayImage(baseTemplate, personalizedOverlay);
		},
	});
};
