// Function to manually convert UTC to Namibia time zone
const convertToNamibiaTime = (utcDate: Date) => {
	// Namibia is in Central Africa Time (CAT), which is UTC+2
	const namibiaOffset = 2 * 60; // Offset in minutes

	const namibiaTime = new Date(utcDate.getTime() + namibiaOffset * 60000);
	return namibiaTime;
};

export const getNftMetadata = (
	fid: number,
	displayName: string,
	animal: string,
	timeSpotted: number,
) => {
	// Convert the timeSpotted to a Date object
	const utcDate = new Date(timeSpotted);

	// Convert the UTC date to Namibia's local time
	const localTimeSpotted = convertToNamibiaTime(utcDate);

	// Determine time of day
	const hours = localTimeSpotted.getHours();
	const timeOfDay = hours < 6 || hours > 18 ? "night" : "day";

	return {
		name: "Safaricaster",
		description: `${animal} spotted by ${displayName} (FID #${fid}) on Safaricaster!`,
		attributes: [
			{
				trait_type: "animal",
				value: animal,
			},
			{
				trait_type: "timeOfDay",
				value: timeOfDay,
			},
			{
				trait_type: "timeSpotted",
				value: timeSpotted,
			},
		],
	};
};
