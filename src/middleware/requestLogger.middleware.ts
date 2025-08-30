import { type Request, type Response, type NextFunction, response } from "express";
import { pool } from "../config/db.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', async () => {
        try {
            const duration = Date.now() - start;
            const client = (req as any).client;
            const clientId = client?.id ?? null;
            const apiKey = (req.header('x-api-key') ?? null) as string | null;
            const endpoint = req.originalUrl || req.url;
            const method = req.method;
            const status = res.statusCode;

            pool.execute(
                `INSERT INTO api_logs (client_id, api_key, endpoint, method, status_code, response_time_ms)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [clientId, apiKey, endpoint, method, status, duration]
            ).catch((e) => {
                console.error("Failed to write to api logs: ", e);
            });
        } catch (e) {
            console.error("Request error: ", e);
        }
    });
    next();
}

