import { Router, type Request, type Response } from 'express';
import { authenticateApiKey } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticateApiKey);

router.get("/test", (req: Request, res: Response) => {
    const client = (req as any).client;
    res.json({ message: `Hello ${client.name}, your API Gateway works` });
});

router.get('/', (req, res) => res.json({ ok: true, message: "API root" }));

export default router;