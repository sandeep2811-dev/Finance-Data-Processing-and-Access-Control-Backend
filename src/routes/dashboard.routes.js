import express from "express";
import {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getTypeSummary,
} from "../controllers/dashboard.controller.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/summary", allowRoles("admin", "analyst"), getSummary);
router.get("/category-summary", allowRoles("admin", "analyst"), getCategorySummary);
router.get("/monthly-trends", allowRoles("admin", "analyst"), getMonthlyTrends);
router.get("/type-summary", allowRoles("admin", "analyst"), getTypeSummary);

export default router;