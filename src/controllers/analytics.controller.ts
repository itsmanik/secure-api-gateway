import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Get API key from request header
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
      return res.status(401).json({ message: "API key required" });
    }

    // total requests for this user
    const [totalRows]: any = await pool.query(
      `SELECT COUNT(*) as total FROM api_logs WHERE api_key = ?`,
      [apiKey]
    );

    // requests per endpoint
    const [endpointRows]: any = await pool.query(
      `SELECT endpoint, COUNT(*) as count
       FROM api_logs
       WHERE api_key = ?
       GROUP BY endpoint
       ORDER BY count DESC`,
      [apiKey]
    );

    // error count
    const [errorRows]: any = await pool.query(
      `SELECT COUNT(*) as errors
       FROM api_logs
       WHERE api_key = ? AND status_code >= 400`,
      [apiKey]
    );

    // average response time
    const [avgRows]: any = await pool.query(
      `SELECT AVG(response_time_ms) as avg_response_time
       FROM api_logs
       WHERE api_key = ?`,
      [apiKey]
    );

    res.json({
      totalRequests: totalRows[0].total,
      requestsPerEndpoint: endpointRows,
      totalErrors: errorRows[0].errors,
      avgResponseTime: avgRows[0].avg_response_time,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};
