import { Router, type Request, type Response } from 'express';
import { authenticateApiKey } from '../middleware/auth.middleware.js';
import { requestLogger } from '../middleware/requestLogger.middleware.js';
import { rateLimit } from '../middleware/rateLimit.middleware.js';
import { authenticateApiKey as apiKeyAuth } from "../middleware/auth.middleware.js"

const router = Router();

router.use(authenticateApiKey);
router.use(requestLogger);
router.use(rateLimit);

router.get("/test", (req, res) => { 
  res.json({ message: "Hello World" });
});


  /**
   * @openapi
   * /api/test:
   *   get:
   *     summary: Test protected route
   *     description: Verify that the API Gateway authentication works using an API key.
   *     security:
   *       - ApiKeyAuth: []   # Refers to security scheme defined in Swagger setup
   *     responses:
   *       200:
   *         description: Successful authentication
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Hello user 1, your API key works
   *       401:
   *         description: Unauthorized (invalid or missing API key)
   */


router.get("/test", apiKeyAuth, (req, res) => {
    res.json({ message: `Hello user ${(req as any).userId}, your API key works` });
})

router.get('/', (req, res) => res.json({ ok: true, message: "API root" }));

export default router;