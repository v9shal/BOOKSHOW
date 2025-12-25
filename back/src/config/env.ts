import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing");
}
