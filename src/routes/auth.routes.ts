import express from "express";
import { AuthService } from "../services/auth.service.js";
import { ApiKeyService } from "../services/apiKey.service.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.signup(username, password);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { userId } = await AuthService.login(username, password);
        const apiKey = await ApiKeyService.createApiKey(userId);
        res.json({ apiKey });
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
});

export default router;