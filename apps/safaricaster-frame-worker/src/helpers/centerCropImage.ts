import { PhotonImage, crop } from "@cf-wasm/photon";

export const centerCropImage = (
	image: ArrayBuffer,
	width: number,
	height: number,
	quality = 80,
) => {
	const photonImage = PhotonImage.new_from_byteslice(new Uint8Array(image));

	const imageWidth = photonImage.get_width();
	const imageHeight = photonImage.get_height();

	if (width > imageWidth || height > imageHeight) {
		throw new Error(
			`Requested crop dimensions are larger than the image: requested dimensions are ${width}x${height} while image dimensions are ${imageWidth}x${imageHeight}`,
		);
	}

	const x1 = Math.floor((imageWidth - width) / 2);
	const y1 = Math.floor((imageHeight - height) / 2);

	const x2 = x1 + width;
	const y2 = y1 + height;

	const croppedImage = crop(photonImage, x1, y1, x2, y2);

	const outputBytes = croppedImage.get_bytes_jpeg(quality);

	photonImage.free();
	croppedImage.free();

	return outputBytes.buffer;
};
