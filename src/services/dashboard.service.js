import { pool } from "../config/db.js";

export const getSummary = async () => {
  const income = await pool.query(
    `SELECT COALESCE(SUM(amount),0) FROM records WHERE type='income' AND is_deleted=false`
  );

  const expense = await pool.query(
    `SELECT COALESCE(SUM(amount),0) FROM records WHERE type='expense' AND is_deleted=false`
  );

  return {
    total_income: Number(income.rows[0].coalesce),
    total_expense: Number(expense.rows[0].coalesce),
    balance:
      Number(income.rows[0].coalesce) -
      Number(expense.rows[0].coalesce),
  };
};

export const getCategorySummary = async () => {
  const result = await pool.query(
    `SELECT category, SUM(amount) as total
     FROM records
     WHERE is_deleted=false
     GROUP BY category`
  );

  return result.rows;
};

export const getMonthlyTrends = async () => {
  const result = await pool.query(
    `SELECT DATE_TRUNC('month', date) as month, SUM(amount) as total
     FROM records
     WHERE is_deleted=false
     GROUP BY month
     ORDER BY month`
  );

  return result.rows;
};

export const getTypeSummary = async () => {
  const result = await pool.query(
    `SELECT type, SUM(amount) as total
     FROM records
     WHERE is_deleted=false
     GROUP BY type`
  );

  return result.rows;
};