import { envVars } from "@/envVars";

export async function uploadFile(file: Blob, timestamp: number) {
	const formData = new FormData();
	formData.append("imageFile", file);
	formData.append("timestamp", timestamp.toString());

	const response = await fetch(
		`${envVars.WORKER_URL}/uploadImageRoute/uploadScreenshot`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${envVars.ADMIN_AUTH_JWT}`,
			},
			body: formData,
		},
	);

	if (response.ok) {
		const data = await response.json();
		console.log("Upload successful:", data);
	} else {
		const errorText = await response.text();
		console.error("Failed to upload file:", errorText);
	}
}

// upload from local directory
// async function uploadAllFiles(directory: string) {
//   console.log("Uploading files from directory:", directory);
//   const files = fs.readdirSync(directory);

//   for (const fileName of files) {
//     const filePath = path.join(directory, fileName);
//     const fileBuffer = fs.readFileSync(filePath);
//     const file = new File([fileBuffer], fileName, {
//       type: "application/octet-stream",
//     });
//     const animal = "frog"; // Adjust as necessary
//     const timestamp = new Date().toISOString();

//     await uploadFile(file, animal, timestamp);
//   }
// }

// const IMAGE_DIRECTORY = "screenshots";
// uploadAllFiles(IMAGE_DIRECTORY);
