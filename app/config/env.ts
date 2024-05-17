import { z } from "zod";

const envSchema = z.object({
  ENCRYPTION_KEY: z.string().default("TODO: MOVE AWAY FROM DOTENV-VALT"),
});

export const env = envSchema.parse({
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
});
