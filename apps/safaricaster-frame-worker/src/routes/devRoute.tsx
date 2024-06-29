import { requireAdminAuth } from "@/auth/requireAdminAuth";
import type { Bindings } from "@/Bindings";
import { getNftImageStore } from "@/nft-image/getNftImageStore";
import { LivestreamScreenshot } from "@/livestream-screenshot/LivestreamScreenshot";

import { Frog } from "frog";
import { ImageResponse, loadGoogleFont } from "hono-og";
import { getNftScreenshotLayerStore } from "@/nft-image/getNftScreenshotLayerStore";
import { centerCropImage } from "@/helpers/centerCropImage";
import { startTimer } from "@/utils/timer";
import { getNftPreviewViewStore } from "@/nft-image/getNftPreviewViewStore";
import { getMostRecentCachedScreenshot } from "@/models/screenshots";
import { createKysely } from "@/models/kyselyD1";

export const devRoute = new Frog<{ Bindings: Bindings }>({
	title: "Safaricaster",
});

devRoute.use(async (c, next) => {
	if (c.env.ENVIRONMENT !== "development") {
		return c.status(404);
	}

	await next();
});

devRoute.post("/testAdminAuth", requireAdminAuth, async (c) => {
	return c.json({ message: "Admin Auth Successful" });
});

devRoute.get("/testLivestreamScreenshot", async (c) => {
	return new ImageResponse(
		<LivestreamScreenshot imageUrl="https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/b8740ae4-298e-4076-dc9e-3571eceaea00/public" />,
		{
			fonts: [
				{
					name: "Ubuntu Mono",
					data: await loadGoogleFont({ family: "Ubuntu Mono", weight: 400 }),
				},
			],
			width: 1910,
			height: 1000,
		},
	);
});

devRoute.get("/testNftImageCanvas", async (c) => {
	const latestScreenshot = await getMostRecentCachedScreenshot(
		createKysely(c.env.SAFARICASTER_D1_DATABASE),
	);
	const nftScreenshotLayerStore = getNftScreenshotLayerStore(c.env);
	const image = await nftScreenshotLayerStore.get(latestScreenshot!.id);

	c.status(200);
	c.header("Content-Type", "image/png");

	return c.body(image);
});

devRoute.get("/testCropImage", async (c) => {
	const nftImageStore = getNftImageStore(c.env);

	const timer0 = startTimer("nftImageStore.get");

	const image = await nftImageStore.get({
		screenshotId: "37602873-3698-47bc-8f42-af3b3fdd053c",
		fid: 1001,
	});

	timer0.endTimer();

	console.log("test");
	console.log("test");
	console.log("test");
	console.log("test");

	const timer = startTimer("centerCropImage");
	const croppedImage = await centerCropImage(image, 2048, 1072);
	timer.endTimer();

	console.log("test");
	console.log("test");
	console.log("test");

	c.status(200);
	c.header("Content-Type", "image/jpeg");

	return c.body(croppedImage);
});

devRoute.get("/testOverlayMessageBox", async (c) => {
	const latestScreenshot = await getMostRecentCachedScreenshot(
		createKysely(c.env.SAFARICASTER_D1_DATABASE),
	);

	const nftPreviewViewStore = getNftPreviewViewStore(c.env);

	const timer0 = startTimer("nftImageStore.get");

	const image = await nftPreviewViewStore.get({
		screenshotId: latestScreenshot!.id,
		fid: 1001,
	});

	timer0.endTimer();

	console.log("test");
	console.log("test");
	console.log("test");
	console.log("test");

	const timer = startTimer("centerCropImage");
	// const croppedImage = await centerCropImage(image, 2048, 1072);
	timer.endTimer();

	console.log("test");
	console.log("test");
	console.log("test");

	c.status(200);
	c.header("Content-Type", "image/jpeg");

	return c.body(image);
});
devRoute.get("/testNftImageGeneration", async (c) => {
	const nftImageStore = getNftImageStore(c.env);

	const latestScreenshot = await getMostRecentCachedScreenshot(
		createKysely(c.env.SAFARICASTER_D1_DATABASE),
	);

	// const image = await testGenerateImage(
	// 	c.env,
	// 	"37602873-3698-47bc-8f42-af3b3fdd053c",
	// );

	const image = await nftImageStore.get({
		screenshotId: latestScreenshot?.id,
		fid: 1001,
	});

	c.status(200);
	c.header("Content-Type", "image/png");

	return c.body(image);
});

// devRoute.get("/safaricaster-r2-bucket/:basePath/:id{.+\\.(png|jpeg)$}", async (c) => {
devRoute.get("/safaricaster-r2-bucket/:basePath/:id", async (c) => {
	const basePath = c.req.param("basePath");
	const id = c.req.param("id");

	const fullId = `${basePath}/${id}`;

	console.log("fullId", fullId);
	console.log("fullId", fullId);
	console.log("fullId", fullId);
	console.log("fullId", fullId);
	console.log("fullId", fullId);
	console.log("fullId", fullId);

	const object = await c.env.SAFARICASTER_R2_BUCKET.get(fullId);

	if (object === null) {
		return new Response("Object Not Found", { status: 404 });
	}

	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set("etag", object.httpEtag);

	return new Response(object.body, {
		headers,
	});
});
