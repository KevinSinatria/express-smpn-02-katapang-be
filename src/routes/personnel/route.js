import express from "express";
import * as PersonnelController from "../../controllers/personnel.controller.js";
import { uploadSingleImage } from "../../config/multer.js";

const router = express.Router();

router.get("/", PersonnelController.getAllPersonnel);
router.post("/", uploadSingleImage, PersonnelController.createPersonnel);
router.get("/:id", PersonnelController.getPersonnelById);
router.put(
	"/:id",
	uploadSingleImage,
	PersonnelController.updatePersonnelById
);
router.delete("/:id", PersonnelController.deletePersonnelById);

export default router;
