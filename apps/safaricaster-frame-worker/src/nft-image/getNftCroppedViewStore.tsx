import type { Bindings } from "@/Bindings";
import { getCachedObjectStore } from "@/object-store/getObjectStore";
import { getNftImageStore } from "@/nft-image/getNftImageStore";
import { centerCropImage } from "@/helpers/centerCropImage";

export const getNftCroppedViewStore = (bindings: Bindings) => {
	return getCachedObjectStore({
		bindings,
		basePath: "nft-cropped-view",
		// if you want to always regenerate the image, set this to true
		// shouldAlwaysRegenerate: true,
		keyFn: ({ screenshotId, fid }: { screenshotId: string; fid: number }) => {
			return `${[screenshotId, fid].join("-")}`;
		},
		operationFn: async ({
			screenshotId,
			fid,
		}: { screenshotId: string; fid: number }) => {
			const nftImageStore = getNftImageStore(bindings);

			const image = await nftImageStore.get({
				screenshotId,
				fid,
			});

			return await centerCropImage(image, 1024, 536);
		},
	});
};
