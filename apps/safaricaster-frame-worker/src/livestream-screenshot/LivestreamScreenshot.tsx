import { getScaled } from "@/utils/getScaled";
import { object } from "zod";

const AnimalFoundBanner = ({ animalName }: { animalName: string | null }) => {
	if (!animalName)
		return (
			<div
				style={{
					display: "flex",
				}}
			/>
		);

	return (
		<div
			style={{
				display: "flex",
				backgroundColor: "white",
				borderRadius: getScaled(4),
				border: `${getScaled(1)}px solid #000000`,
				padding: getScaled(7),
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					fontSize: getScaled(13),
					borderRadius: getScaled(4),
					border: `${getScaled(1)}px solid #000000`,
					backgroundColor: "#E9E7F1",
					color: "#282828",
					paddingLeft: getScaled(8),
					paddingRight: getScaled(8),
					paddingTop: getScaled(11),
					paddingBottom: getScaled(11),
				}}
			>
				<div style={{ display: "flex", marginBottom: getScaled(7) }}>
					A {animalName} has appeared!
				</div>
				<div>Mint the moment!</div>
			</div>
		</div>
	);
};

export const LivestreamScreenshot = ({
	imageUrl,
	animalName,
	pfpUrls,
}: {
	imageUrl: string;
	animalName: string | null;
	pfpUrls: (string | null)[];
}) => {
	const selectedPfpUrls = pfpUrls
		.sort(() => 0.5 - Math.random())
		.slice(0, pfpUrls.length > 5 ? 5 : pfpUrls.length);

	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				height: "100%",
				width: "100%",
			}}
		>
			<img
				src={imageUrl}
				style={{
					position: "absolute",
					height: "1000px",
					width: "1910px",
					objectFit: "cover",
				}}
			/>

			<div
				style={{
					display: "flex",
					position: "absolute",
					top: getScaled(13),
					left: getScaled(13),
					width: getScaled(38),
					height: getScaled(38),
					borderTop: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
					borderLeft: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
				}}
			/>
			<div
				style={{
					display: "flex",
					position: "absolute",
					top: getScaled(13),
					right: getScaled(13),
					width: getScaled(38),
					height: getScaled(38),
					borderTop: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
					borderRight: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
				}}
			/>
			<div
				style={{
					display: "flex",
					position: "absolute",
					bottom: getScaled(13),
					right: getScaled(13),
					width: getScaled(38),
					height: getScaled(38),
					borderBottom: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
					borderRight: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
				}}
			/>
			<div
				style={{
					display: "flex",
					position: "absolute",
					bottom: getScaled(13),
					left: getScaled(13),
					width: getScaled(38),
					height: getScaled(38),
					borderBottom: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
					borderLeft: `${getScaled(2)}px solid rgba(0,0,0,.2)`,
				}}
			/>
			{/* <img
				src="https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/8f1d3339-ac65-42e2-a63c-d3df8cd90500/framesquare"
				style={{
					position: "absolute",
					height: getScaled(34),
					top: getScaled(24),
					left: getScaled(20),
				}}
			/> */}
			{/* Facepile */}
			<div
				style={{
					display: "flex",
					position: "absolute",
					top: getScaled(22),
					left: getScaled(22),
					flexDirection: "row",
				}}
			>
				{selectedPfpUrls.map((url, index) => (
					<div
						key={index}
						style={{
							display: "flex",
							position: "relative",
							width: getScaled(36),
							height: getScaled(36),
							borderRadius: "50%",
							overflow: "visible",
							border: "4px solid white",
							marginLeft: index === 0 ? 0 : getScaled(-6),
							backgroundImage: `url(${url})`,
							backgroundSize: "100% 100%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								position: "absolute",
								bottom: getScaled(0), // Position it outside the larger circle
								right: getScaled(0), // Position it outside the larger circle
								width: getScaled(8),
								height: getScaled(8),
								borderRadius: "50%",
								border: "2px solid white",
								backgroundColor: "#09E805",
								zIndex: 2, // Ensure it appears on top
							}}
						/>
					</div>
				))}
			</div>
			<div
				style={{
					display: "flex",
					position: "absolute",
					top: getScaled(22),
					right: getScaled(22),
				}}
			>
				<AnimalFoundBanner animalName={animalName} />
			</div>

			<div
				style={{
					fontFamily: "Ubuntu Mono",
					position: "absolute",
					left: getScaled(30),
					bottom: getScaled(28),
					fontSize: getScaled(16),
					color: "white",
				}}
			>
				THE NAMIB DESERT
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					fontFamily: "Ubuntu Mono",
					position: "absolute",
					right: getScaled(54),
					bottom: getScaled(27),
					fontSize: getScaled(16),
					color: "white",
				}}
			>
				<div
					style={{
						display: "flex",
						marginRight: getScaled(4),
						borderRadius: "100%",
						width: getScaled(11),
						height: getScaled(11),
						backgroundColor: "#F22E41",
					}}
				/>
				LIVE
			</div>
		</div>
	);
};
