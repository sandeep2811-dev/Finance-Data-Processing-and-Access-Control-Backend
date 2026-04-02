import { pool } from "../config/db.js";

export const createUser = async (data) => {
  const { name, email, role } = data;

  const result = await pool.query(
    `INSERT INTO users (name, email, role)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, role]
  );

  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};