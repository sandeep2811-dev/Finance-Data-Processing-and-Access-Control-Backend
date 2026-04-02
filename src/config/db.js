import pkg from "pg";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve("../.env") });


const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("PostgreSQL Connected");
});


pool.on("error", (err) => {
  console.error("PostgreSQL Error:", err.message);
});