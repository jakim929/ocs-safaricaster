const FIGMA_DESIGN_WIDTH = 1200;
const FRAME_IMAGE_WIDTH = 1024;

const SCALE = FRAME_IMAGE_WIDTH / FIGMA_DESIGN_WIDTH;

// Makes it easier to just use size values from the Figma design files

export const getScaledForNft = (length: number) => {
	return Math.floor(length * SCALE);
};
