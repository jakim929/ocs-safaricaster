import { getScaledForNft } from "@/utils/getScaledForNft";

export const NftImagePersonalizedOverlay = ({
	idHashtag,
	description,
	username,
}: {
	idHashtag: string;
	description: string;
	username: string;
}) => {
	return (
		<div
			style={{
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: getScaledForNft(105),
					top: getScaledForNft(496),
					display: "flex",
					fontFamily: "Rubik Mono One",
					fontSize: getScaledForNft(19),
					color: "#F3F4F6",
				}}
			>
				{idHashtag}
			</div>
			<div
				style={{
					position: "absolute",
					left: getScaledForNft(105),
					top: getScaledForNft(556),
					width: getScaledForNft(257),
					display: "flex",
					fontFamily: "Ubuntu Mono",
					fontSize: getScaledForNft(15),
					color: "#F3F4F6",
				}}
			>
				{description}
			</div>
			<div
				style={{
					position: "absolute",
					left: getScaledForNft(105),
					top: getScaledForNft(771),
					width: getScaledForNft(257),
					display: "flex",
					justifyContent: "center",
					fontFamily: "Ubuntu Mono",
					fontSize: getScaledForNft(16),
					color: "#F3F4F6",
				}}
			>
				****{username}****
			</div>
		</div>
	);
};
