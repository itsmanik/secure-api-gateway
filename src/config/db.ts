import { createPool, type Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Creating my sql connection pool
export const pool: Pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "pass123",
  database: process.env.DB_NAME || "api_gateway",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,    
});

export async function testConnection(): Promise<boolean> {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
}
