import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { z } from "zod";
import { serveStatic } from "frog/serve-static";
import type { Bindings } from "@/Bindings";
import { uploadImageRoute } from "./screenshot-taker/uploadImageRoute";
import { createKysely } from "@/models/kyselyD1";
import {
	getMostRecentCachedScreenshot,
	getScreenshot,
	markScreenshotAsCached,
} from "@/models/screenshots";
import { devRoute } from "@/routes/devRoute";
import { createView } from "@/models/views";
import { getScreenshotFeedViewStore } from "@/livestream-screenshot/getScreenshotFeedViewStore";
import { requireAdminAuth } from "@/auth/requireAdminAuth";
import { pinMintedTokenUris } from "@/helpers/pinMintedTokenUris";
import { getNftPreviewViewStore } from "@/nft-image/getNftPreviewViewStore";
import { getLivestreamScreenshotStore } from "./livestream-screenshot/getLivestreamScreenshotStore";
import { getScreenshotShareLink } from "@/helpers/getScreenshotShareLink";
import { withFrameVerification } from "@/middlewares/withFrameVerification";
import { NamibAnimalsAbi } from "@/abis/NamibAnimalsAbi";
import { SafaricasterAbi } from "@/abis/SafaricasterAbi";
import { getNftMetadata } from "@/constants/nftMetadata";
import { getOwnerSignature } from "@/helpers/getOwnerSignature";
import { getPublicClient } from "@/helpers/getPublicClient";
import { parseSignatureIntoVrs } from "@/helpers/parseSignatureIntoVrs";
import { createMintPermit } from "@/models/mintPermits";
import { getNftImageStore } from "@/nft-image/getNftImageStore";
import { generateRandomNonce } from "@/utils/generateRandomNonce";
import { getDidUserViewScreenshot } from "@/models/views";
import { getMintPermitForTokenUri } from "@/models/mintPermits";
import { animalById, type AnimalId } from "@/constants/animalById.ts";
import { type Address, type Hex, parseEther, parseEventLogs } from "viem";
import { getNftMintSuccessViewStore } from "@/nft-image/getNftMintSuccessViewStore";
import { getMintShareLink } from "@/helpers/getMintShareLink";
import { getLocalFarcasterUserStore } from "@/local-store/getLocalFarcasterUserStore";
import type { Job } from "@/queue/Queue";
import { getNftScreenshotLayerStore } from "@/nft-image/getNftScreenshotLayerStore";

export const app = new Frog<{ Bindings: Bindings }>({
	title: "Safaricaster",
	imageOptions: {
		width: 1910,
		height: 1000,
	},
});

app.frame("/", async (c) => {
	const screenshotStore = getScreenshotFeedViewStore(c.env);
	const screenshot = await getMostRecentCachedScreenshot(
		createKysely(c.env.SAFARICASTER_D1_DATABASE),
	);

	if (!screenshot) {
		throw Error("Screenshot not found");
	}

	const image = screenshotStore.getUrlNoFetch({
		screenshotId: screenshot.id,
	});

	return c.res({
		image: image,
		intents: [
			<Button action="/view">Join livestream</Button>,
			<Button.Link
				href={
					"https://github.com/jakim929/dailyteam-monorepo/blob/main/README.md"
				}
			>
				About Safaricaster
			</Button.Link>,
		],
		title: "Namib Animals",
	});
});

// /VIEW
app.frame("/view", withFrameVerification, async (c) => {
	if (!c.frameData) {
		throw Error("No frame data");
	}

	const [farcasterUser, screenshot] = await Promise.all([
		getLocalFarcasterUserStore(c.env).get(c.frameData.fid),
		getMostRecentCachedScreenshot(createKysely(c.env.SAFARICASTER_D1_DATABASE)),
	]);

	if (!screenshot) {
		throw Error("Screenshot not found");
	}

	if (!screenshot) {
		return c.res({
			image: (
				<div
					style={{
						display: "flex",
						height: "100vh",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					No screenshot found
				</div>
			),
			intents: <Button action="/view">Refresh</Button>,
		});
	}

	const fid = farcasterUser.fid;

	await createView(createKysely(c.env.SAFARICASTER_D1_DATABASE), {
		screenshotId: screenshot.id,
		fid: fid,
	});

	// for share links
	const screenshotFeedViewStore = getScreenshotFeedViewStore(c.env);
	const screenshotFeedViewKey = screenshotFeedViewStore.getKey({
		screenshotId: screenshot.id,
	});
	// cut out "screenshot-feed-view/"
	const imageKey = screenshotFeedViewKey.slice(21);

	const liveStreamFacepileViewStore = getLivestreamScreenshotStore(c.env);
	const liveStreamFacepileView = liveStreamFacepileViewStore.getUrlNoFetch({
		screenshotId: screenshot.id,
	});

	return c.res({
		image: liveStreamFacepileView,
		imageOptions: {
			width: 1910,
			height: 1000,
		},
		intents: [
			screenshot.animalId ? (
				<Button action={`/preview/${screenshot.id}`} value="Preview">
					Preview NFT
				</Button>
			) : null,
			<Button.Link
				href={getScreenshotShareLink(c.env, screenshot.animalId, imageKey)}
			>
				Share stream
			</Button.Link>,
			<Button action="/view" value="Refresh">
				Refresh
			</Button>,
		].filter(Boolean),
	});
});

app.frame("/preview/:screenshotId", withFrameVerification, async (c) => {
	if (!c.frameData) {
		throw Error("Frame data not found");
	}

	const paramParseResult = z
		.object({
			screenshotId: z.string(),
		})
		.safeParse(c.req.param());

	if (!paramParseResult.success) {
		throw Error("Invalid params");
	}

	const screenshotId = paramParseResult.data.screenshotId;

	const screenshot = await getScreenshot(
		createKysely(c.env.SAFARICASTER_D1_DATABASE),
		screenshotId,
	);
	if (!screenshot) {
		throw Error("Screenshot not found");
	}

	const nftPreviewViewStore = getNftPreviewViewStore(c.env);
	// const nftPreviewViewStore = getNftImageStore(c.env);

	const image = await nftPreviewViewStore.getUrl({
		screenshotId: screenshot.id,
		fid: c.frameData.fid,
	});

	return c.res({
		image,
		intents: [
			<Button action="/view">Back</Button>,
			<Button.Transaction
				target={`/nft-mint/mintTx/${screenshot.id}`}
				action={`/nft-mint/mintTxSubmitted`}
			>
				Mint NFT
			</Button.Transaction>,
		],
	});
});

app.frame("share/image/:screenshotId", withFrameVerification, async (c) => {
	const paramParseResult = z
		.object({
			screenshotId: z.string(),
		})
		.safeParse(c.req.param());

	if (!paramParseResult.success) {
		throw Error("Invalid params");
	}

	const { screenshotId } = paramParseResult.data;

	const imageUrl = await getScreenshotFeedViewStore(c.env).getUrl({
		screenshotId,
	});

	return c.res({
		image: imageUrl,
		intents: [
			<Button.Link
				href={
					"https://github.com/jakim929/dailyteam-monorepo/blob/main/README.md"
				}
			>
				About Safaricaster
			</Button.Link>,
			<Button action="/view">Join livestream</Button>,
		],
	});
});

app.frame(
	"/share/mint/:mintSuccessViewKey",
	withFrameVerification,
	async (c) => {
		const base = `${c.env.SAFARICASTER_R2_BUCKET_BASE_URL}/nft-image/`;
		const paramParseResult = z
			.object({
				mintSuccessViewKey: z.string(),
			})
			.safeParse(c.req.param());

		if (!paramParseResult.success) {
			throw Error("Invalid params");
		}

		const { mintSuccessViewKey } = paramParseResult.data;

		return c.res({
			image: base + mintSuccessViewKey,
			intents: [
				<Button.Link
					href={
						"https://github.com/jakim929/dailyteam-monorepo/blob/main/README.md"
					}
				>
					About Safaricaster
				</Button.Link>,
				<Button action="/view">Join livestream</Button>,
			],
		});
	},
);

app.transaction(
	"nft-mint/mintTx/:screenshotId",
	withFrameVerification,
	async (c) => {
		if (!c.frameData) {
			throw Error("No frame data");
		}

		const farcasterUser = await getLocalFarcasterUserStore(c.env).get(
			c.frameData.fid,
		);

		const fid = farcasterUser.fid;
		const displayName = farcasterUser.username;

		const paramParseResult = z
			.object({
				screenshotId: z.string(),
			})
			.safeParse(c.req.param());

		if (!paramParseResult.success) {
			throw Error("Invalid params");
		}

		const { screenshotId } = paramParseResult.data;

		const screenshot = await getScreenshot(
			createKysely(c.env.SAFARICASTER_D1_DATABASE),
			screenshotId,
		);
		if (!screenshot) {
			throw Error("Screenshot not found");
		}

		const animalId = screenshot.animalId;
		const animal = animalById[animalId as AnimalId];
		const timeSpotted = screenshot.timestamp;

		const didUserViewScreenshot = await getDidUserViewScreenshot(
			createKysely(c.env.SAFARICASTER_D1_DATABASE),
			fid,
			screenshotId,
		);

		if (!didUserViewScreenshot) {
			throw Error(`User ${fid}  has not viewed screenshot ${screenshotId}`);
		}

		const nftImageStore = getNftImageStore(c.env);
		const image = await nftImageStore.get({
			screenshotId,
			fid,
		});

		const imageKey = nftImageStore.getKey({
			screenshotId,
			fid,
		});

		const formData = new FormData();
		const imageFileBlob = new Blob([image], { type: "image/png" });
		const imageFile = new File([imageFileBlob], "nft-image.png", {
			type: "image/png",
		});
		formData.append("imageFile", imageFile);
		formData.append(
			"tokenMetadata",
			JSON.stringify(getNftMetadata(fid, displayName, animal.id, timeSpotted)),
		);

		const registrationResult = await c.env.IPFS_STORAGE_WORKER.fetch(
			"https://something.invalid/registerNftMetadata",
			{
				method: "POST",
				body: formData,
				headers: {
					ContentType: "multipart/form-data",
				},
			},
		);

		const { tokenUri } = (await registrationResult.json()) as {
			tokenUri: string;
		};

		const recipient = c.address as Address;
		const mintPrice = parseEther("0.00099");
		const nonce = generateRandomNonce();
		const issuance = {
			tokenUri: tokenUri,
			recipient: recipient,
			nonce: nonce,
		};

		// pass in bindings for private key
		const signature = await getOwnerSignature(c.env, issuance);

		const mintPermit = await getMintPermitForTokenUri(
			createKysely(c.env.SAFARICASTER_D1_DATABASE),
			tokenUri,
		);

		if (!mintPermit) {
			await createMintPermit(createKysely(c.env.SAFARICASTER_D1_DATABASE), {
				screenshotId,
				animalId,
				fid,
				chainId: "8453",
				recipient,
				nonce: nonce.toString(),
				signature,
				imageObjectKey: imageKey,
				tokenUri: issuance.tokenUri,
			});
		}

		const { v, r, s } = parseSignatureIntoVrs(signature);

		// Contract transaction response.
		return c.contract({
			abi: SafaricasterAbi,
			chainId: "eip155:8453",
			functionName: "mintToWithSignature",
			args: [recipient, issuance, v, r, s],
			to: c.env.NFT_CONTRACT_ADDRESS as Address,
			value: mintPrice,
		});
	},
);

app.frame(
	"nft-mint/mintTxSubmitted/:txHash?",
	withFrameVerification,
	async (c) => {
		const transactionHash = c.req.param("txHash") || c.transactionId;

		if (!transactionHash) {
			throw Error("No transaction ID");
		}

		// TODO ideally move this off to a job queue that pins once the mint tx goes through
		// await c.env.IPFS_STORAGE_WORKER.pinNftMetadata();

		const transactionReceipt = await getPublicClient(c.env)
			.getTransactionReceipt({
				hash: transactionHash as Hex,
			})
			.catch((e) => {
				console.error(e);
				return null;
			});

		if (!transactionReceipt) {
			return c.res({
				image:
					"https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/d58bb23d-59d5-4eca-6bdd-f8fb61ad0400/croppednft",
				intents: (
					<Button action={`/nft-mint/mintTxSubmitted/${transactionHash}`}>
						Refresh
					</Button>
				),
			});
		}

		if (transactionReceipt.status !== "success") {
			return c.res({
				image: (
					<div
						style={{
							color: "black",
							display: "flex",
							height: "100vh",
							justifyContent: "center",
							alignItems: "center",
							fontSize: 30,
						}}
					>
						Transaction failed
					</div>
				),
				intents: <Button.Reset>Reset</Button.Reset>,
			});
		}

		const logs = parseEventLogs({
			abi: NamibAnimalsAbi,
			eventName: "Minted",
			logs: transactionReceipt.logs,
		});
		if (logs.length === 0) {
			throw Error("Mint event not found");
		}

		const tokenUri = logs[0].args.tokenUri;

		const nftMintSuccessViewStore = getNftMintSuccessViewStore(c.env);
		const mintPermit = await getMintPermitForTokenUri(
			createKysely(c.env.SAFARICASTER_D1_DATABASE),
			tokenUri,
		);

		if (!mintPermit) {
			throw Error("Mint permit not found");
		}

		const imageUrl = await nftMintSuccessViewStore.getUrl({
			screenshotId: mintPermit.screenshotId,
			fid: mintPermit.fid,
		});

		const nftImageStore = getNftImageStore(c.env);
		const imageStoreKey = nftImageStore.getKey({
			screenshotId: mintPermit.screenshotId,
			fid: mintPermit.fid,
		});

		// cut out nft-image/
		const imageKey = imageStoreKey.slice(10);

		return c.res({
			image: imageUrl,
			intents: [
				<Button action={`/view`}>Back</Button>,
				<Button.Link
					href={getMintShareLink(c.env, mintPermit.animalId, imageKey)}
				>
					Share NFT
				</Button.Link>,
			],
		});
	},
);

app.route("/uploadImageRoute", uploadImageRoute);

app.post("/pinMintedTokenUris", requireAdminAuth, async (c) => {
	await pinMintedTokenUris(c.env);
	return c.json({
		success: true,
	});
});

// Only for local dev convenience
app.route("/dev", devRoute);

const isCloudflareWorker = typeof caches !== "undefined";
if (isCloudflareWorker) {
	const manifest = await import("__STATIC_CONTENT_MANIFEST");
	const serveStaticOptions = { manifest, root: "./" };
	app.use("/*", serveStatic(serveStaticOptions));
	devtools(app, { assetsPath: "/frog", serveStatic, serveStaticOptions });
} else {
	devtools(app, { serveStatic });
}

export default {
	fetch: app.fetch,

	async queue(batch, bindings: Bindings): Promise<void> {
		await Promise.all(
			batch.messages.map(async (message) => {
				const type = message.body.type;
				if (type === "warm-nft-screenshot-layer-store") {
					await getNftScreenshotLayerStore(bindings).get(
						message.body.screenshotId,
					);
				} else if (type === "warm-screenshot-feed-view-store") {
					await getScreenshotFeedViewStore(bindings).get({
						screenshotId: message.body.screenshotId,
					});
				} else if (type === "warm-livestream-screenshot-store") {
					await getLivestreamScreenshotStore(bindings).get({
						screenshotId: message.body.screenshotId,
					});
					await markScreenshotAsCached(
						createKysely(bindings.SAFARICASTER_D1_DATABASE),
						message.body.screenshotId,
					);
				}
			}),
		);
	},
} satisfies ExportedHandler<Bindings, Job>;
