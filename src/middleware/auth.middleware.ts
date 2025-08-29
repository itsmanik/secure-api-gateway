import type { Request, Response, NextFunction } from "express";
import { getClientByApiKey } from "../services/apiKey.service.js";

export async function authenticateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
        return res.status(401).json({ error: "Api key missing" });
    }
    
    const client = await getClientByApiKey(apiKey);
    if (!client) {
        return res.status(403).json({ error: "Invalid API Key" });
    }
    (req as any).client = client;
    next();
}