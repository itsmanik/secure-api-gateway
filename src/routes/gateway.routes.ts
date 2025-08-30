import { Router, type Request, type Response } from 'express';
import { authenticateApiKey } from '../middleware/auth.middleware.js';
import { requestLogger } from '../middleware/requestLogger.middleware.js';
import { rateLimit } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.use(authenticateApiKey);
router.use(requestLogger);
router.use(rateLimit);

router.get("/test", (req: Request, res: Response) => {
    const client = (req as any).client;
    res.json({ message: `Hello ${client.name}, your API Gateway works` });
});

router.get('/', (req, res) => res.json({ ok: true, message: "API root" }));

export default router;