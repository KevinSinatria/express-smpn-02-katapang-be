import * as ArticleCategoriesService from "../services/articleCategories.service.js";

export const getAllArticleCategories = async (req, res) => {
	try {
		const articleCategories =
			await ArticleCategoriesService.getAllArticleCategories(req);
		res.status(200).send(articleCategories);
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getArticleCategoryById = async (req, res) => {
	try {
		const { id } = req.params;
		const articleCategory =
			await ArticleCategoriesService.getArticleCategoryById(id);
		res.status(200).send(articleCategory);
	} catch (error) {
		console.log(error);

		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Article Category not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createArticleCategory = async (req, res) => {
	try {
		const articleCategory =
			await ArticleCategoriesService.createArticleCategory(req.body);
		res.status(201).send(articleCategory);
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateArticleCategoryById = async (req, res) => {
	try {
		const { id } = req.params;
		const articleCategory =
			await ArticleCategoriesService.updateArticleCategoryById(id, req.body);
		res.status(200).send(articleCategory);
	} catch (error) {
		console.log(error);

		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Article Category not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteArticleCategoryById = async (req, res) => {
	try {
		const { id } = req.params;
		const articleCategory =
			await ArticleCategoriesService.deleteArticleCategoryById(id);
		res.status(200).send(articleCategory);
	} catch (error) {
		console.log(error);

		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Article Category not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
