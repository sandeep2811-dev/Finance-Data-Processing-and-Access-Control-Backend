import * as repo from "../repositories/record.repository.js";

export const createRecord = async (data, userId) => {
  if (data.amount <= 0) {
    throw new Error("Amount must be positive");
  }

  return await repo.createRecord(data, userId);
};

export const getRecords = async (filters) => {
  return await repo.getRecords(filters);
};

export const updateRecord = async (id, data) => {
  if (data.amount && data.amount <= 0) {
    throw new Error("Invalid amount");
  }

  return await repo.updateRecord(id, data);
};

export const deleteRecord = async (id) => {
  return await repo.softDeleteRecord(id);
};

export const restoreRecord = async (id) => {
  return await repo.restoreRecord(id);
};