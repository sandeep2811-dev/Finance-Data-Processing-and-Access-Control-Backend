import * as service from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    return successResponse(res, user, "User created");
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers();
    return successResponse(res, users, "Users fetched");
  } catch (err) {
    next(err);
  }
};