import { pool } from "../config/db.js";

// CREATE
export const createRecord = async (data, userId) => {
  const { amount, type, category, date, note } = data;

  const result = await pool.query(
    `INSERT INTO records (amount, type, category, date, note, user_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [amount, type, category, date, note, userId]
  );

  return result.rows[0];
};

// GEET with filters, pagination, sorting
export const getRecords = async (filters) => {
  let query = `SELECT * FROM records WHERE is_deleted=false`;
  let values = [];

  if (filters.type) {
    values.push(filters.type);
    query += ` AND type = $${values.length}`;
  }

  if (filters.category) {
    values.push(filters.category);
    query += ` AND category = $${values.length}`;
  }

  if (filters.date) {
    values.push(filters.date);
    query += ` AND date = $${values.length}`;
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    query += ` AND (category ILIKE $${values.length} OR note ILIKE $${values.length})`;
  }


  const limit = parseInt(filters.limit) || 10;
  const page = parseInt(filters.page) || 1;
  const offset = (page - 1) * limit;

  // sorting
  if (filters.sort === "amount") {
    query += ` ORDER BY amount DESC`;
  } else {
    query += ` ORDER BY date DESC`;
  }

  query += ` LIMIT ${limit} OFFSET ${offset}`;

  const result = await pool.query(query, values);

  return {
    page,
    limit,
    count: result.rows.length,
    data: result.rows,
  };
};

// UPDATE
export const updateRecord = async (id, data) => {
  const { amount, type, category, date, note } = data;

  const result = await pool.query(
    `UPDATE records
     SET amount=$1, type=$2, category=$3, date=$4, note=$5, updated_at=NOW()
     WHERE id=$6 AND is_deleted=false
     RETURNING *`,
    [amount, type, category, date, note, id]
  );

  return result.rows[0];
};

// SOFT DELETE
export const softDeleteRecord = async (id) => {
  await pool.query(
    `UPDATE records SET is_deleted=true WHERE id=$1`,
    [id]
  );
};

// RESTORE
export const restoreRecord = async (id) => {
  await pool.query(
    `UPDATE records SET is_deleted=false WHERE id=$1`,
    [id]
  );
};