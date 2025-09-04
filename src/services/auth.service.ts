import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { ApiKeyService } from "../services/apiKey.service.js";

export class AuthService {
  static async signup(username: string, password: string) {
    try {
      // Check if the user exists
      const [existing]: any = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (existing.length > 0) {
        return { status: 409, message: "User already exists" };
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result]: any = await pool.query(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        [username, hashedPassword]
      );
      const userId = result.insertId;

      // Create + return API key
      const apiKey = await ApiKeyService.createApiKey(userId);
      return {
        status: 201,
        message: "User Created Successfully",
        apiKey: apiKey,
      };
    } catch (error) {
      console.log("Signup error, ", error);
      return { status: 500, message: "Internal Server Error" };
    }
  }

  static async login(username: string, password: string) {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) throw new Error("User not found");
    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) {
      throw new Error("Invalid password");
    }
    return { userId: rows[0].id };
  }
}
