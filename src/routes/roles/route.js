import express from "express";
import * as RolesController from "../../controllers/roles.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { rolesSchema } from "../../validators/roles.validator.js";

const router = express.Router();

router.get("/", RolesController.getAllRoles);
router.get("/:id", RolesController.getRoleById);
router.post("/", validate(rolesSchema, "body"), RolesController.createRole);
router.put("/:id", validate(rolesSchema, "body"), RolesController.updateRoleById);
router.delete("/:id", RolesController.deleteRoleById);

export default router;
