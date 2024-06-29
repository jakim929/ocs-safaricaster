import { convertToNamibiaTime } from "@/helpers/convertToNamibiaTime";
import { getScaledForNft } from "@/utils/getScaledForNft";

export const NftImageCanvas = ({
	animalName,
	baseImageUrl,
	livestreamScreenshotUrl,
	timestamp,
}: {
	animalName: string;
	baseImageUrl: string;
	livestreamScreenshotUrl: string;
	timestamp: number;
}) => {
	const utcDate = new Date(timestamp);
	const localTimeSpotted = convertToNamibiaTime(utcDate);
	const hours = localTimeSpotted.getHours();
	const timeOfDay = hours < 6 || hours > 18 ? "Night" : "Day";

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
					display: "flex",
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
					width: "100%",
					backgroundImage: `url(${livestreamScreenshotUrl})`,
					backgroundSize: "100% 100%",
					filter: "blur(100px)",
					zIndex: 1,
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					position: "relative",
					height: "100%",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 2,
				}}
			>
				<div
					style={{
						height: getScaledForNft(473),
						display: "flex",
						flexDirection: "row",
						alignItems: "stretch",
					}}
				>
					<div
						style={{
							position: "relative",
							width: getScaledForNft(306),
							border: "3px solid white",
							borderRadius: getScaledForNft(12),
							backgroundImage: `url(https://i.ibb.co/ThP5ZS6/Seamless-ground-dirt-texture-1.png)`,
							backgroundSize: "100% 100%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* Overlay */}
						<div
							style={{
								display: "flex",
								position: "absolute",
								top: 0,
								left: 0,
								height: "100%",
								width: "100%",
								backgroundColor: timeOfDay === "Day" ? "#744C2A" : "black",
								opacity: 0.66,
								borderRadius: "12px",
								zIndex: 1,
							}}
						/>
						{/* Content */}
						<div
							style={{
								display: "flex",
								position: "relative",
								flexDirection: "column",
								zIndex: 2,
								gap: getScaledForNft(24),
								color: "#F3F4F6",
								padding: getScaledForNft(24),
							}}
						>
							<div
								style={{
									display: "flex",
									height: getScaledForNft(57),
									width: getScaledForNft(57),
									borderRadius: "100px",
									backgroundImage: `url(${baseImageUrl})`,
									backgroundSize: "100% 100%",
								}}
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									fontSize: getScaledForNft(19),
									fontFamily: "Rubik Mono One",
								}}
							>
								<div style={{ display: "flex" }}>SAFARICASTER</div>
								<div style={{ display: "flex", height: getScaledForNft(20) }}>
									{/* empty space for hashtag */}
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									fontSize: getScaledForNft(15),
								}}
							>
								<div style={{ display: "flex", color: "#E2E8F0" }}>
									Description
								</div>
								<div style={{ display: "flex", height: getScaledForNft(40) }}>
									{/* An oryx was spotted by */}
								</div>
							</div>
							<div style={{ display: "flex", flexDirection: "row" }}>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										fontSize: getScaledForNft(15),
										marginRight: "15%",
									}}
								>
									<div style={{ display: "flex", color: "#E2E8F0" }}>
										Animal
									</div>
									<div
										style={{ display: "flex", fontSize: getScaledForNft(20) }}
									>
										{animalName}
									</div>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										fontSize: getScaledForNft(15),
									}}
								>
									<div style={{ display: "flex", color: "#E2E8F0" }}>
										Day/Night
									</div>
									<div
										style={{ display: "flex", fontSize: getScaledForNft(20) }}
									>
										{timeOfDay}
									</div>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									fontSize: getScaledForNft(15),
								}}
							>
								<div style={{ display: "flex", color: "#E2E8F0" }}>
									Time Spotted
								</div>
								<div style={{ display: "flex", fontSize: getScaledForNft(20) }}>
									{localTimeSpotted.toLocaleString()}
								</div>
							</div>
							<div
								style={{
									marginTop: "10px",
									height: "18px",
									width: "100%",
									backgroundImage: `url(https://i.ibb.co/YLhn6Kk/barcode-thin.png)`,
									backgroundSize: "100% 100%",
									display: "flex",
								}}
							/>
							<div
								style={{
									marginTop: "-10px",
									width: "100%",
									justifyContent: "center",
									fontSize: getScaledForNft(15),
									display: "flex",
								}}
							>
								{/* ****username**** */}
							</div>
						</div>
					</div>

					{/* Divider */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								height: getScaledForNft(383),
								width: getScaledForNft(14),
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderTop: "3px solid white",
								borderBottom: "3px solid white",
								borderColor: "white",
								backgroundColor: "#AF8C62",
							}}
						>
							<div
								style={{
									display: "flex",
									height: "100%",
									width: "1px",
									backgroundColor: "white",
								}}
							/>
						</div>
					</div>

					{/* Livestream screenshot */}
					<div
						style={{
							width: getScaledForNft(727),
							height: getScaledForNft(473),
							border: "3px solid white",
							borderRadius: "12px",
							backgroundImage: `url(${livestreamScreenshotUrl})`,
							backgroundSize: `${getScaledForNft(893)} ${getScaledForNft(506)}`,
							// smallest fill size for reference
							// backgroundSize: `${getScaledForNft(840)} ${getScaledForNft(473)}`,
							backgroundPosition: `0px -${getScaledForNft(33)}px`,
							backgroundRepeat: "no-repeat",

							position: "relative",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						{/* First inner div */}
						<div
							style={{
								width: "75%",
								height: "100%",
								backgroundImage: `url(https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/731d5215-79d8-46a7-dc51-494c768e0400/thousandsquare)`,
								backgroundSize: "100% 100%",
								display: "flex",
								alignItems: "flex-end",
								justifyContent: "flex-end",
							}}
						/>

						{/* Second inner div positioned at bottom right */}
						<div
							style={{
								position: "absolute",
								bottom: -getScaledForNft(6),
								right: getScaledForNft(10),
								backgroundImage: `url(https://imagedelivery.net/Ptr7qG71Hq7660yYwmxikg/439aee9d-6be8-4a99-3fa6-25d4b38cb500/thousandsquare)`,
								height: getScaledForNft(160),
								width: getScaledForNft(140),
								backgroundSize: "100% 100%",
								zIndex: 2,
								display: "flex",
							}}
						/>
						{/* Sparkling light effect at top right corner */}
						<div
							style={{
								position: "absolute",
								top: getScaledForNft(-100),
								right: getScaledForNft(-57),
								backgroundImage: `url(https://i.ibb.co/d2jG46C/a-Pngtreea-sparkling-light-effect-6670092-1.png)`,
								backgroundSize: "100% 100%",
								width: getScaledForNft(200),
								height: getScaledForNft(200),
								zIndex: 3,
								display: "flex",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
