import { PhotonImage, blend } from "@cf-wasm/photon";

export const overlayImage = (
	baseImage: ArrayBuffer,
	overlayedImage: ArrayBuffer,
	quality = 80,
) => {
	const base = PhotonImage.new_from_byteslice(new Uint8Array(baseImage));

	const overlay = PhotonImage.new_from_byteslice(
		new Uint8Array(overlayedImage),
	);

	if (
		base.get_height() !== overlay.get_height() ||
		base.get_width() !== overlay.get_width()
	) {
		throw new Error(
			`Images must have the same dimensions: overlay has dimensions ${overlay.get_width()}x${overlay.get_height()} while base has dimensions ${base.get_width()}x${base.get_height()}`,
		);
	}

	blend(base, overlay, "over");

	const outputBytes = base.get_bytes_jpeg(quality);

	base.free();
	overlay.free();

	return outputBytes.buffer;
};
