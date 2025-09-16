import express from "express";
import * as ArticleCategoriesController from "../../controllers/articleCategories.controller.js";

const router = express.Router();

router.get("/", ArticleCategoriesController.getAllArticleCategories);
router.get("/:id", ArticleCategoriesController.getArticleCategoryById);
router.post("/", ArticleCategoriesController.createArticleCategory);
router.put("/:id", ArticleCategoriesController.updateArticleCategoryById);
router.delete("/:id", ArticleCategoriesController.deleteArticleCategoryById);

export default router;
