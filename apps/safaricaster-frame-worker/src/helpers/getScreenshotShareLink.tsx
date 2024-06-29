import type { Bindings } from "@/Bindings";

export const getScreenshotShareLink = (
	bindings: Bindings,
	animal: string | undefined,
	screenshotId: string,
) => {
	const BASE_URL = bindings.BASE_URL.replace(/\/$/, ""); // Remove trailing slash if it exists
	const shareLink = `${BASE_URL}/share/image/${screenshotId}`;

	let text = "Join the Namibia Desert stream on Safaricaster 🦁";
	if (animal) {
		text = `I spotted a ${animal} on Safaricaster 🦁`;
		if (["a", "e", "i", "o", "u"].includes(animal[0].toLowerCase())) {
			text = `I spotted an ${animal} on Safaricaster 🦁`;
		}
	}

	const castIntentLink = `https://warpcast.com/~/compose?text=${encodeURI(
		text,
	)}&embeds[]=${shareLink}`;

	return castIntentLink;
};
