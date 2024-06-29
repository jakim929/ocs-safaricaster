import type { Bindings } from "@/Bindings";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { getNftCroppedViewStore } from "@/nft-image/getNftCroppedViewStore";
import { overlayImage } from "@/helpers/overlayImage";

export const getNftPreviewViewStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "nft-preview-view",
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
				"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/e886eaaa-69e7-4023-30e4-e098a37e9c00/smallnftsize",
			).then((res) => res.arrayBuffer());

			return overlayImage(image, overlayMessageBox);
		},
	});
};
