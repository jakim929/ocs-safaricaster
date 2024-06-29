import stealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
import { uploadFile } from "@/uploadFile";
import { pinMintedTokenUris } from "@/pinMintedTokenUris";

// add stealth plugin and use defaults (all evasion techniques)
puppeteer.use(stealthPlugin());

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	// Navigate the page to a URL
	await page.goto("https://www.youtube.com/watch?v=ydYDqZQpim8");

	// Set screen size
	await page.setViewport({ width: 1920, height: 1080 });

	await sleep(5000);

	page.click(".ytp-fullscreen-button.ytp-button");

	await sleep(5000);

	// Take a screenshot

	while (true) {
		const currentTime = new Date().getTime();
		const result = await page.screenshot({
			type: "jpeg",
			quality: 50,
		});
		// convert result (buffer) to Blob
		// need to append key (file name)
		const screenshotBlob = new Blob([result], { type: "image/jpeg" });

		uploadFile(screenshotBlob, currentTime);

		await pinMintedTokenUris();

		await sleep(10000);
	}
	// Close the browser
	await browser.close();
})();
