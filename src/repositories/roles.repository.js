import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";

export const findAll = async (req) => {
	return await paginate(
		prisma.roles,
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
};

export const findById = async (id) => {
	return await prisma.roles.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
			name: true,
			created_at: true,
			updated_at: true,
		},
	});
};

export const create = async (data) => {
	return await prisma.roles.create({
		data: {
			name: data.name,
		},
	});
};

export const updateById = async (id, data) => {
	return await prisma.roles.update({
		where: { id: Number(id) },
		data: {
			name: data.name,
		},
	});
};

export const deleteById = async (id) => {
	return await prisma.roles.delete({
		where: { id: Number(id) },
	});
};
