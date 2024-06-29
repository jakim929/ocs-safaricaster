import type { Bindings } from "@/Bindings";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { getNftCroppedViewStore } from "@/nft-image/getNftCroppedViewStore";
import { overlayImage } from "@/helpers/overlayImage";

export const getNftMintSuccessViewStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "nft-mint-success-view",
		// if you want to always regenerate the image, set this to true
		// shouldAlwaysRegenerate: true,
		keyFn: ({ screenshotId, fid }: { screenshotId: string; fid: number }) => {
			return `${[screenshotId, fid].join("-")}`;
		},
		operationFn: async ({
			screenshotId,
			fid,
		}: { screenshotId: string; fid: number }) => {
			const nftCroppedViewStore = getNftCroppedViewStore(bindings);

			const image = await nftCroppedViewStore.get({
				screenshotId,
				fid,
			});

			const overlayMessageBox = await fetch(
				"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/f85fca42-83e1-4fc1-cc91-b3579368fb00/smallnftsize",
			).then((res) => res.arrayBuffer());

			return await overlayImage(image, overlayMessageBox);
		},
	});
};
