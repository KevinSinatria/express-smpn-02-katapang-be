import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";

export const findAll = async (req) => {
	const headmasters = await paginate(
		prisma.headmasters,
		req,
		{},
		{},
		{
			id: true,
			personnel: {
				select: {
					name: true,
					image_url: true,
				},
			},
			period: true,
			welcoming_sentence: true,
			created_at: true,
			updated_at: true,
		},
		10
	);
	return headmasters;
};

export const findById = async (id) => {
	const headmaster = await prisma.headmasters.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
			personnel: {
				select: {
					name: true,
					image_url: true,
				},
			},
			period: true,
			welcoming_sentence: true,
			created_at: true,
			updated_at: true,
		},
	});

	if (!headmaster) {
		const error = new Error("Headmaster not found");
		error.code = "P2025";
		throw error;
	}

	return headmaster;
};

export const create = async (data) => {
	const newHeadmaster = await prisma.headmasters.create({
		data: {
			personnel_id: data.personnel_id,
			period: data.period,
			welcoming_sentence: data.welcoming_sentence,
		},
	});
	return newHeadmaster;
};

export const updateById = async (id, data) => {
	const headmaster = await prisma.headmasters.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!headmaster) {
		const error = new Error("Headmaster not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.headmasters.update({
		where: { id: Number(id) },
		data: {
			personnel_id: data.personnel_id,
			period: data.period,
			welcoming_sentence: data.welcoming_sentence,
		},
	});
};

export const deleteById = async (id) => {
	const headmaster = await prisma.headmasters.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!headmaster) {
		const error = new Error("Headmaster not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.headmasters.delete({
		where: { id: Number(id) },
	});
};
