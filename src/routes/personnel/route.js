import express from "express";
import * as PersonnelController from "../../controllers/personnel.controller.js";

const router = express.Router();

router.get("/", PersonnelController.getAllPersonnel);

export default router;
