import { envVars } from "@/envVars";

export const pinMintedTokenUris = async () => {
	await fetch(`${envVars.WORKER_URL}/pinMintedTokenUris`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${envVars.ADMIN_AUTH_JWT}`,
		},
	});
};
