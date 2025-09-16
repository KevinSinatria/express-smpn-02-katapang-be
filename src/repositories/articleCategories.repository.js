import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";

export const findAll = async (req) => {
	const articleCategories = await paginate(
		prisma.articleCategories,
		req,
		{},
		{},
		{
			id: true,
			name: true,
			created_at: true,
			updated_at: true,
		},
		10
	);
	return articleCategories;
};

export const findById = async (id) => {
	const articleCategory = await prisma.articleCategories.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
			name: true,
			created_at: true,
			updated_at: true,
			articles: {
				select: {
					id: true,
					title: true,
					thumbnail_url: true,
					created_at: true,
					updated_at: true,
				},
			},
		},
	});

	if (!articleCategory) {
		const error = new Error("Article Category not found");
		error.code = "P2025";
		throw error;
	}

	return articleCategory;
};

export const create = async (data) => {
	const articleCategory = await prisma.articleCategories.create({
		data: {
			name: data.name,
		},
	});

	return articleCategory;
};

export const updateById = async (id, data) => {
	const articleCategory = await prisma.articleCategories.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!articleCategory) {
		const error = new Error("Article Category not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.articleCategories.update({
		where: { id: Number(id) },
		data: {
			name: data.name,
		},
	});
};

export const deleteById = async (id) => {
	const articleCategory = await prisma.articleCategories.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!articleCategory) {
		const error = new Error("Article Category not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.articleCategories.delete({
		where: { id: Number(id) },
	});
};
