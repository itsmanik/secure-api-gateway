import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

/**
 * @openapi
 * /api/analytics:
 *   get:
 *     summary: Get API usage analytics
 *     description: Fetch analytics data (total requests, errors, response times, and per-endpoint counts) for the current user based on their API key.
 *     security:
 *       - ApiKeyAuth: []   # Requires a valid API key in the x-api-key header
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRequests:
 *                   type: integer
 *                   example: 120
 *                 requestsPerEndpoint:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       endpoint:
 *                         type: string
 *                         example: /auth/signup
 *                       count:
 *                         type: integer
 *                         example: 45
 *                 totalErrors:
 *                   type: integer
 *                   example: 10
 *                 avgResponseTime:
 *                   type: number
 *                   format: float
 *                   example: 125.6
 *       401:
 *         description: Unauthorized (API key missing or invalid)
 *       500:
 *         description: Server error (failed to fetch analytics)
 */

router.get("/", getAnalytics);

export default router;
