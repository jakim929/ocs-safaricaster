import { z } from "zod";

export type AnimalConfig = {
	id: string;
	name: string;
	photoFrameYOffset: number;
	baseImage: string;
};

export const animalById = {
	gemsbok: {
		id: "gemsbok",
		name: "Gemsbok",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/1ce0337a-1e67-4d96-cdba-2e2f58b8c100/squaretiny",
	},
	meerkat: {
		id: "meerkat",
		name: "Meerkat",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/5fef84d9-702c-4067-4a8d-a1f5c27fcf00/squaretiny",
	},
	lion: {
		id: "lion",
		name: "Lion",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/f512a567-abe2-4547-2199-ceb3a799ce00/squaretiny",
	},
	zebra: {
		id: "zebra",
		name: "Zebra",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/671193ac-6870-4dbc-2ccc-0b56c629d400/squaretiny",
	},
	elephant: {
		id: "elephant",
		name: "Elephant",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/03bb7108-2674-4fd3-7d38-3ddefc2c6100/squaretiny",
	},
	cheetah: {
		id: "cheetah",
		name: "Cheetah",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/00a5dfc3-8608-412e-539f-17360aaec800/squaretiny",
	},
	hyena: {
		id: "hyena",
		name: "Hyena",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/46c96599-1d5c-4d7c-70e2-5d1803db6400/squaretiny",
	},
	giraffe: {
		id: "giraffe",
		name: "Giraffe",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/bedbc978-a5e6-427c-4601-3cc462142f00/squaretiny",
	},
	springbok: {
		id: "springbok",
		name: "Springbok",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/2cad8994-d941-4d16-d630-be20e75cc400/squaretiny",
	},
	"black-backed-jackal": {
		id: "black-backed-jackal",
		name: "Black-backed Jackal",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/73de37a8-bce1-41b1-2496-de36584bbf00/squaretiny",
	},
	ostrich: {
		id: "ostrich",
		name: "Ostrich",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/9d7a843b-9b9a-4789-6cea-f5c4ea626c00/squaretiny",
	},
	"puff-adder": {
		id: "puff-adder",
		name: "Puff Adder",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/02e2f7e5-6700-40db-3ed8-f0e527420e00/squaretiny",
	},
	"rock-hyrax": {
		id: "rock-hyrax",
		name: "Rock Hyrax",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/fcc36580-bcf5-4fb2-497b-2699ff590500/squaretiny",
	},
	aardvark: {
		id: "aardvark",
		name: "Aardvark",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/2649cfbe-1b6c-41ee-35c0-e719ebd0e200/squaretiny",
	},
	wildebeest: {
		id: "wildebeest",
		name: "Wildebeest",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/4f2d3976-0593-41e2-53a8-5fcdc7274200/squaretiny",
	},
	rabbit: {
		id: "rabbit",
		name: "Rabbit",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/73f5e144-b166-4ddb-f5a1-3c036d38f300/squaretiny",
	},
	caracal: {
		id: "caracal",
		name: "Caracal",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/11f8f40f-1d39-4820-0832-07074fb7a900/squaretiny",
	},
	"cape-fox": {
		id: "cape-fox",
		name: "Cape Fox",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/874333a2-7a84-47cb-adab-2615d8f4c500/squaretiny",
	},
	leopard: {
		id: "leopard",
		name: "Leopard",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/56a7e6b4-7648-474b-5aba-a89a7e67cb00/squaretiny",
	},
	porcupine: {
		id: "porcupine",
		name: "Porcupine",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/8f77e5e4-6595-4ae1-9f8f-ef6e83a88d00/squaretiny",
	},
	serval: {
		id: "serval",
		name: "Serval",
		photoFrameYOffset: 43.4,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/761e260c-8288-46a0-53c2-0d8de6870a00/squaretiny",
	},
	bushbaby: {
		id: "bushbaby",
		name: "Bushbaby",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/8a9455b8-7134-49ab-28fd-c820e4339200/squaretiny",
	},
	pangolin: {
		id: "pangolin",
		name: "Pangolin",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/794f63cc-9320-47bf-7e43-3c09c11b0e00/squaretiny",
	},
	mongoose: {
		id: "mongoose",
		name: "Mongoose",
		photoFrameYOffset: 36.8,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/c7507bb5-e397-4cc4-a21e-a4155a848d00/squaretiny",
	},
	hartebeest: {
		id: "hartebeest",
		name: "Hartebeest",
		photoFrameYOffset: 49.9,
		baseImage:
			"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/127723df-2345-4948-4e39-62c7132d7400/squaretiny",
	},
} as const satisfies Record<string, AnimalConfig>;

export type AnimalId = keyof typeof animalById;

export const animalIdSchema = z.string().refine(
	(x): x is AnimalId => {
		return !!(animalById as Record<string, AnimalConfig>)[x];
	},
	{ message: "Unsupported animal" },
);
