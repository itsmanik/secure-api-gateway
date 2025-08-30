import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

export const redis = REDIS_URL ? new Redis(REDIS_URL) : null;

if (redis) {
  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });
}