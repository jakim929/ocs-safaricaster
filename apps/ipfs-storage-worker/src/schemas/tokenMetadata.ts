import { z } from "zod";

export const baseAttributeSchema = z.union([
	z.object({
		trait_type: z.string(),
		value: z.string(),
	}),
	z.object({
		trait_type: z.string(),
		value: z.number(),
	}),
]);

export const numberAttributeSchema = z.object({
	display_type: z.literal("number"),
	trait_type: z.string(),
	value: z.number(),
});

export const boostPercentageAttributeSchema = z.object({
	display_type: z.literal("boost_percentage"),
	trait_type: z.string(),
	value: z.number(),
});

export const boostNumberAttributeSchema = z.object({
	display_type: z.literal("boost_number"),
	trait_type: z.string(),
	value: z.number(),
});

export const dateAttributeSchema = z.object({
	display_type: z.literal("date"),
	trait_type: z.string(),
	value: z.number().int(),
});

export const attributeSchema = z.union([
	baseAttributeSchema,
	numberAttributeSchema,
	boostPercentageAttributeSchema,
	boostNumberAttributeSchema,
	dateAttributeSchema,
]);

export const tokenMetadataSchema = z.object({
	name: z.string(),
	image: z.string(),
	description: z.string(),
	external_url: z.string().optional(),
	attributes: z.array(attributeSchema).optional(),
});
