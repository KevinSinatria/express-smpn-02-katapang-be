import express from "express";
import * as HeadmastersController from "../../controllers/headmasters.controller.js";

const router = express.Router();

router.get("/", HeadmastersController.getAllHeadmasters);
router.get("/:id", HeadmastersController.getHeadmasterById);
router.post("/", HeadmastersController.createHeadmaster);
router.put("/:id", HeadmastersController.updateHeadmasterById);
router.delete("/:id", HeadmastersController.deleteHeadmasterById);

export default router;
