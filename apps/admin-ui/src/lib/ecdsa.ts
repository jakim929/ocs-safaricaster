import { ab2str } from "@/lib/ab2str";
import { str2ab } from "@/lib/str2ab";

export const getAsPem = (
	descriptor: "PUBLIC KEY" | "PRIVATE KEY",
	b64: string,
) => {
	const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
	return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
};

export const getWithoutPem = (pem: string) => {
	return pem
		.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "")
		.slice(0);
};

export const generateNewKeyPair = async () => {
	const newKey = await crypto.subtle.generateKey(
		{ name: "ECDSA", namedCurve: "P-256" },
		true,
		["sign", "verify"],
	);

	return {
		publicKey: getAsPem(
			"PUBLIC KEY",
			btoa(ab2str(await crypto.subtle.exportKey("spki", newKey.publicKey))),
		),
		privateKey: getAsPem(
			"PRIVATE KEY",
			btoa(ab2str(await crypto.subtle.exportKey("pkcs8", newKey.privateKey))),
		),
	};
};

export const getPublicKeyFromPrivateKey = async (
	pkcs8PrivateKeyPem: string,
) => {
	const pkcs8PrivateKey = getWithoutPem(pkcs8PrivateKeyPem);

	const privateKey = await crypto.subtle.importKey(
		"pkcs8",
		str2ab(atob(pkcs8PrivateKey)),
		{
			name: "ECDSA",
			namedCurve: "P-256",
		},
		true,
		["sign"],
	);

	// from https://stackoverflow.com/questions/72151096/how-to-derive-public-key-from-private-key-using-webcryptoapi
	const jwkPrivate = await crypto.subtle.exportKey("jwk", privateKey);

	// biome-ignore lint: no-delete
	delete jwkPrivate.d;

	jwkPrivate.key_ops = ["verify"];

	const publicfromprivate = await crypto.subtle.importKey(
		"jwk",
		jwkPrivate,
		{ name: "ECDSA", namedCurve: "P-256" },
		true,
		["verify"],
	);
	const publicKey = await crypto.subtle.exportKey("spki", publicfromprivate);

	return getAsPem("PUBLIC KEY", btoa(ab2str(publicKey)));
};
