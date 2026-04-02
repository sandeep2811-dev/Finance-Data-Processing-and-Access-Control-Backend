import express from "express";
import * as ctrl from "../controllers/record.controller.js";
import { validateRecord } from "../validators/record.validator.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", allowRoles("admin"), validateRecord, ctrl.createRecord);
router.get("/", allowRoles("admin", "analyst", "viewer"), ctrl.getRecords);

router.put("/:id", allowRoles("admin"), validateRecord, ctrl.updateRecord);
router.delete("/:id", allowRoles("admin"), ctrl.deleteRecord);
router.patch("/:id/restore", allowRoles("admin"), ctrl.restoreRecord);

export default router;