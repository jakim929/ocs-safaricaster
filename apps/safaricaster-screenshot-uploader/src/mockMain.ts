import { uploadFile } from "@/uploadFile";
import fs from "node:fs";
import { sleep } from "@/sleep";
import { pinMintedTokenUris } from "@/pinMintedTokenUris";

const imageFilenames = [
	"1.jpeg",
	// "2.jpeg",
	// "3.jpeg",
	"4.jpeg",
	// "5.jpeg",
	"6.jpeg",
	"7.jpeg",
];

const getRandomImageFileName = () => {
	const randomIndex = Math.floor(Math.random() * imageFilenames.length);
	return imageFilenames[randomIndex];
};

(async () => {
	await sleep(5000);

	while (true) {
		console.log("looping");
		const currentTime = new Date().getTime();

		const randomImageFileName = getRandomImageFileName();

		const file = fs.readFileSync(`./mockImages/${randomImageFileName}`);
		console.log("Uploading file", randomImageFileName);

		const screenshotBlob = new Blob([file], { type: "image/jpeg" });

		await uploadFile(screenshotBlob, currentTime);

		await pinMintedTokenUris();

		await sleep(5000);
	}
})();
