export const postImageToR2 = async (c, blob: Blob) => {
	const form = new FormData();
	form.append("file", blob);
	form.append("animal", "frog");

	const fetchResult = await c.env.SAFARICASTER_R2_BUCKET.put(
		"livestream-screenshots/filename",
		blob,
	);

	if (!fetchResult.ok) {
		throw new Error(
			`Failed to post file to R2 ${fetchResult.status}: ${fetchResult.statusText}`,
		);
	}

	return fetchResult.json();
};

app.post("/postImageToR2", async (c) => {
	const formData = await c.req.parseBody();
	const file = formData.get("file") as File;
	const animal = formData.get("animal") as string;
	const timestamp = formData.get("timestamp") as string;

	if (!filePath) {
		return c.json({ error: "No file path provided" }, 400);
	}

	// Simulate reading the file content
	const fileContent = await fetch(filePath).then((res) => res.blob());
	const file = new File([fileContent], filePath, {
		type: "image/jpeg",
	}); // name set to filePath rn

	const uploadFormData = new FormData();
	uploadFormData.append("imageFile", file);
	uploadFormData.append("animal", animal || "");
	uploadFormData.append("timestamp", timestamp || new Date().toISOString());

	// Call the upload route
	const response = await fetch(
		`${c.req.url.replace(
			"/postImageToR2",
			"/uploadImageRoute/uploadScreenshot",
		)}`, // safaricaster-worker URL
		{
			method: "POST",
			body: uploadFormData,
		},
	);

	if (response.ok) {
		const data = await response.json();
		return c.json(data);
	}
	const errorText = await response.text();
	return c.text(`Failed to upload file: ${errorText}`, response.status);
});
