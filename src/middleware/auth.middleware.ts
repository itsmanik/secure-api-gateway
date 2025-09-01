import type { Request, Response, NextFunction } from "express";
import { ApiKeyService } from "../services/apiKey.service.js";

export async function authenticateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header("x-api-key") as string;
    if (!apiKey) {
        return res.status(401).json({ error: "Api key missing" });
    }
    
    const userId = await ApiKeyService.validateApiKey(apiKey);
    if (!userId) return res.status(403).json({ error: "Invalid API key" });
    (req as any).userId = userId;
    next();
}