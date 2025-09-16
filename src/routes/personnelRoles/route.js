import express from "express";
import * as PersonnelRolesController from "../../controllers/personnelRoles.controller.js";

const router = express.Router();

router.post("/", PersonnelRolesController.createPersonnelRole);
router.put("/:id", PersonnelRolesController.updatePersonnelRoleById);
router.delete("/:id", PersonnelRolesController.deletePersonnelRoleById);

export default router;
