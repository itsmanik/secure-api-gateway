import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // total requests
    const [totalRows]: any = await pool.query(
      `SELECT COUNT(*) as total FROM api_logs`
    );

    // Requests per endpoint
    const [endpointRows]: any = await pool.query(
      `SELECT endpoint, COUNT(*) as count
            FROM api_logs
            GROUP BY endpoint
            ORDER BY count DESC`
    );

    // Error count
    const [errorRows]: any = await pool.query(
      `SELECT COUNT(*) as errors
            FROM api_logs
            WHERE status_code >= 400`
    );

    // Average Response time
    const [avgRows]: any = await pool.query(
      `SELECT AVG(response_time_ms) as avg_response_time
            FROM api_logs`
    );

    res.json({
      totalRequests: totalRows[0].total,
      requestsPerEndpoint: endpointRows,
      totalErrors: errorRows[0].errors,
      avgResponseTime: avgRows[0].avg_response_time,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};
