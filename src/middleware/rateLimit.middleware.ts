import type { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.js";
import { pool } from "../config/db.js";

// in-memory fallback store
const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

function getWindowSlot(windowSec = 60) {
    return Math.floor(Date.now() / (windowSec * 1000));
}

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
    try {
        const client = (req as any).client;
        const clientId = client?.id ?? (req.header("x-api-key") ?? 'anonymous');
        const envDefault = Number(process.env.RATE_LIMIT_PER_MIN ?? 60);
        const max = (client && client.rate_limit_per_min) ? Number(client.rate_limit_per_min) : envDefault;
        const windowSec = 60;
        const slot = getWindowSlot(windowSec);

        // using redis 
        if (redis) {
            const key = `rl:${clientId}:${slot}`;
            const curr = await redis.incr(key);
            if (curr === 1) {
                await redis.expire(key, windowSec + 1);
            }
            // building headers
            const remaining = Math.max(0, max - curr);
            res.setHeader("X-RateLimit-Limit", String(max));
            res.setHeader("X-RateLimit-Remaining", String(remaining));
            const ttl = await redis.ttl(key);
            if (ttl > 0) {
                res.setHeader("X-RateLimit-Reset", String(ttl));
            }
            if (curr > max) {
                return res.status(429).json({ error: "Rate Limit Exceeded" });
            }
            return next();
        }

        // Fallback: single-process memory fixed-window
        const bucketKey = `${clientId}:${slot}`;
        const rec = memoryBuckets.get(bucketKey) ?? { count: 0, resetAt: (slot + 1) * windowSec * 1000 };
        rec.count += 1;
        memoryBuckets.set(bucketKey, rec);

        const remaining = Math.max(0, max - rec.count);
        const resetMs = rec.resetAt - Date.now();
        res.setHeader('X-RateLimit-Limit', String(max));
        res.setHeader('X-RateLimit-Remaining', String(remaining));
        res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetMs / 1000)));

        if (rec.count > max) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        return next();
    }
    catch (error) {
        console.log("rateLimit middleware error", error);
        return res.status(500).json({ error: "Rate Limiter Error" });
    }
}
