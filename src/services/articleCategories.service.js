import * as ArticleCategoriesRepository from "../repositories/articleCategories.repository.js";

export const getAllArticleCategories = async (req) => {
	try {
		return await ArticleCategoriesRepository.findAll(req);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getArticleCategoryById = async (id) => {
	try {
		return await ArticleCategoriesRepository.findById(id);
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export const createArticleCategory = async (data) => {
	try {
		return await ArticleCategoriesRepository.create(data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateArticleCategoryById = async (id, data) => {
	try {
		return await ArticleCategoriesRepository.updateById(id, data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteArticleCategoryById = async (id) => {
	try {
		return await ArticleCategoriesRepository.deleteById(id);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
