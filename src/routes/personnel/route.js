import express from "express";
import * as PersonnelController from "../../controllers/personnel.controller.js";
import { uploadPersonnelImage } from "../../config/multer.js";

const router = express.Router();

router.get("/", PersonnelController.getAllPersonnel);
router.post("/", uploadPersonnelImage, PersonnelController.createPersonnel);
router.get("/:id", PersonnelController.getPersonnelById);
router.put(
	"/:id",
	uploadPersonnelImage,
	PersonnelController.updatePersonnelById
);
router.delete("/:id", PersonnelController.deletePersonnelById);

export default router;
