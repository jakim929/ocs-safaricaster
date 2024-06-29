import { getScaled } from "@/utils/getScaled";

export const SomethingWentWrong = () => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				backgroundColor: "#F45E5E",
				fontFamily: "Inter",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: getScaled(28),
				}}
			>
				Something went wrong. Try again!
			</div>
		</div>
	);
};
