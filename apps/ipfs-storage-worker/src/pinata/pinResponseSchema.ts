import { z } from "zod";

export const pinResponseSchema = z.object({
	IpfsHash: z.string(),
	PinSize: z.number(),
	Timestamp: z.coerce.date(),
	isDuplicate: z.boolean().optional(),
});
