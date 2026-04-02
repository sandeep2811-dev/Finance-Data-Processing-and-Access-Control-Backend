import * as service from "../services/record.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createRecord = async (req, res, next) => {
  try {
    const data = await service.createRecord(req.body, req.user.id);
    return successResponse(res, data, "Record created");
  } catch (err) {
    next(err);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const data = await service.getRecords(req.query);
    return successResponse(res, data, "Records fetched");
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const data = await service.updateRecord(req.params.id, req.body);
    return successResponse(res, data, "Record updated");
  } catch (err) {
    next(err);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    await service.deleteRecord(req.params.id);
    return successResponse(res, null, "Record deleted");
  } catch (err) {
    next(err);
  }
};

export const restoreRecord = async (req, res, next) => {
  try {
    await service.restoreRecord(req.params.id);
    return successResponse(res, null, "Record restored");
  } catch (err) {
    next(err);
  }
};