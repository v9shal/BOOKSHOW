import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32, 'Secret must be 32+ chars'),
  CLIENT_URL: z.string().url(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug']).default('info'),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error(' Invalid Environment:', envVars.error.format());
  process.exit(1);
}

export const config = envVars.data;