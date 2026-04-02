import * as service from "../services/dashboard.service.js";
import { successResponse } from "../utils/apiResponse.js";

// summary
export const getSummary = async (req, res, next) => {
  try {
    const data = await service.getSummary();
    return successResponse(res, data, "Dashboard summary");
  } catch (err) {
    next(err);
  }
};

// category summary
export const getCategorySummary = async (req, res, next) => {
  try {
    const data = await service.getCategorySummary();
    return successResponse(res, data, "Category summary");
  } catch (err) {
    next(err);
  }
};

// monthly trends
export const getMonthlyTrends = async (req, res, next) => {
  try {
    const data = await service.getMonthlyTrends();
    return successResponse(res, data, "Monthly trends");
  } catch (err) {
    next(err);
  }
};

// type summary
export const getTypeSummary = async (req, res, next) => {
  try {
    const data = await service.getTypeSummary();
    return successResponse(res, data, "Type summary");
  } catch (err) {
    next(err);
  }
};