import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export class AuthService {
    static async signup(username: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash]
        );
        return { message: "User created" };
    }

    static async login(username: string, password: string) {
        const [rows]: any = await pool.query(
            "SELECT * FROM users WHERE username = ?", [username]
        );
        if (rows.length === 0) throw new Error("User not found");
        const valid = await bcrypt.compare(password, rows[0].password_hash);
        if (!valid) {
            throw new Error("Invalid password");
        }
        return { userId: rows[0].id };
    }
}