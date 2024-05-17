require("dotenv-vault-core").config();

import { z } from "zod";

const envSchema = z.object({
  ENCRYPTION_KEY: z.string(),
});

export const env = envSchema.parse({
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
});
