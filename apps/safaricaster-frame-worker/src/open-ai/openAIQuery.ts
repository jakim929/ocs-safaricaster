import OpenAI from "openai";
import { getPrompt } from "@/open-ai/getPrompt";
import type { Bindings } from "@/Bindings";

let openAi: OpenAI | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

export async function getAnimal(bindings: Bindings, fileData: ArrayBuffer) {
	if (!openAi) {
		openAi = new OpenAI({
			apiKey: bindings.OPENAI_API_KEY,
		});
	}
	const prompt = getPrompt();
	const base64Image = await arrayBufferToBase64(fileData);
	const response = await openAi.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: [
					{ type: "text", text: prompt },
					{
						type: "image_url",
						image_url: {
							url: `data:image/jpeg;base64,${base64Image}`,
						},
					},
				],
			},
		],
	});
	return response.choices[0].message.content;
}
