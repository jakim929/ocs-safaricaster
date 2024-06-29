import type { Bindings } from "@/Bindings";

export const getMintShareLink = (
	bindings: Bindings,
	animal: string | undefined,
	imageKey: string,
) => {
	const BASE_URL = bindings.BASE_URL.replace(/\/$/, ""); // Remove trailing slash if it exists
	const shareLink = `${BASE_URL}/share/mint/${imageKey}`;

	let text =
		"Freshly minted on Safaricaster! Proceeds go to Namibia Desert conservation efforts :) ";
	if (animal) {
		text = `I minted a ${animal} on Safaricaster. Proceeds go to Namibia Desert conservation efforts :) !`;
		if (["a", "e", "i", "o", "u"].includes(animal[0].toLowerCase())) {
			text = `I minted an ${animal} on Safaricaster! Proceeds go to Namibia Desert conservation efforts :)`;
		}
	}

	const castIntentLink = `https://warpcast.com/~/compose?text=${encodeURI(
		text,
	)}&embeds[]=${shareLink}`;

	return castIntentLink;
};
