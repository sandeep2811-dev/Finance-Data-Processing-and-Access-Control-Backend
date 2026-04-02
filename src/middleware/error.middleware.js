import { errorResponse } from "../utils/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  return errorResponse(res, err.message || "Internal Server Error", 500);
};