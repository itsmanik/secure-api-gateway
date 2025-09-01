import { pool } from "../config/db.js";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

export class ApiKeyService {
  static async createApiKey(userId: Number) {
    const rawKey = "key-" + randomBytes(16).toString("hex");
    const hashedKey = await bcrypt.hash(rawKey, 10);
    await pool.query("INSERT INTO api_keys (user_id, key_hash) VALUES (?, ?)", [
      userId,
      hashedKey,
    ]);
    return rawKey;
  }

  static async validateApiKey(rawKey: string) {
    const [rows]: any = await pool.query("SELECT * FROM api_keys");
    for (const row of rows) {
      const match = await bcrypt.compare(rawKey, row.key_hash);
      if (match) return row.user_id;
    }
    return null;
  }
}
