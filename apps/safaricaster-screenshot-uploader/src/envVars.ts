import "dotenv/config";
import { parseEnv } from "znv";
import { z } from "zod";

export const envVars = parseEnv(process.env, {
	ADMIN_AUTH_JWT: z.string(),
	WORKER_URL: z.string(),
});
