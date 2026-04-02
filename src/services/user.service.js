import * as repo from "../repositories/user.repository.js";

export const createUser = async (data) => {
  if (!data.name || !data.email || !data.role) {
    throw new Error("All fields required");
  }

  return await repo.createUser(data);
};

export const getUsers = async () => {
  return await repo.getAllUsers();
};