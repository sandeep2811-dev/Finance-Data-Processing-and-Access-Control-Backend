import express from "express";
import * as ctrl from "../controllers/user.controller.js";
import { validateUser } from "../validators/user.validator.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// only admin can create users
router.post("/", allowRoles("admin"), validateUser, ctrl.createUser);

// admin only
router.get("/", allowRoles("admin"), ctrl.getUsers);

export default router;