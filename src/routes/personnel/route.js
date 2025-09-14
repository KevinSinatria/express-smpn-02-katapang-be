import express from "express";
import * as PersonnelController from "../../controllers/personnel.controller.js";
import { uploadPersonnelImage } from "../../config/multer.js";

const router = express.Router();

router.get("/", PersonnelController.getAllPersonnel);
router.post("/", uploadPersonnelImage, PersonnelController.createPersonnel);

export default router;
