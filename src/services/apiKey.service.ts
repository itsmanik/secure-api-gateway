import { pool } from "../config/db.js";

export async function getClientByApiKey(apiKey: string) {
  const [rows]: any = await pool.query("SELECT * FROM clients WHERE api_key = ?", [apiKey]);
  return rows.length > 0 ? rows[0] : null;
}