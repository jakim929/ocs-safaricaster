import { Frog } from "frog";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createKysely } from "@/models/kyselyD1";
import { createScreenshot } from "@/models/screenshots";
import { getAnimal } from "@/open-ai/openAIQuery";
import type { Bindings } from "@/Bindings";
import { requireAdminAuth } from "@/auth/requireAdminAuth";
import type { AnimalId } from "@/constants/animalById";

export const uploadImageRoute = new Frog<{ Bindings: Bindings }>({
	title: "Safaricaster",
});

uploadImageRoute.post(
	"/uploadScreenshot",
	requireAdminAuth,
	zValidator(
		"form",
		z.object({
			imageFile: z.instanceof(File),
			timestamp: z.string().optional(),
		}),
	),
	async (c) => {
		const { imageFile, timestamp } = c.req.valid("form");
		const fileData = await imageFile.arrayBuffer();

		// Upload to R2
		const key = `screenshots/${timestamp}.jpeg`;
		const R2_BUCKET = c.env.SAFARICASTER_R2_BUCKET;
		await R2_BUCKET.put(key, fileData);
		let animal = null;

		// Get animal using chatGPT
		const chatGPTResult = await getAnimal(c.env, fileData);

		if (!chatGPTResult) {
			throw new Error("Failed to get animal from ChatGPT");
		}
		const cleanedResult = chatGPTResult.replace(/```json\n|\n```/g, "").trim();

		if (JSON.parse(cleanedResult).animal_exists) {
			animal = JSON.parse(cleanedResult).animal_name;
		}

		// Write to D1 database
		const screenshot = await createScreenshot(
			createKysely(c.env.SAFARICASTER_D1_DATABASE),
			{
				id: crypto.randomUUID(),
				imageObjectKey: key as string,
				areTransformationsCached: false,
				animalId: animal
					? (animal.toLowerCase().split(" ").join("-") as AnimalId)
					: undefined,
				timestamp: Number(timestamp),
			},
		);

		await c.env.QUEUE.send({
			type: "warm-screenshot-feed-view-store",
			screenshotId: screenshot.id,
		});

		if (animal) {
			await c.env.QUEUE.send({
				type: "warm-nft-screenshot-layer-store",
				screenshotId: screenshot.id,
			});
		}

		await c.env.QUEUE.send({
			type: "warm-livestream-screenshot-store",
			screenshotId: screenshot.id,
		});

		return c.json({ message: "File uploaded successfully", key });
	},
);
