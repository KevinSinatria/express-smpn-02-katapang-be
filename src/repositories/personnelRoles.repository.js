import prisma from "../config/prisma.js";
export const create = async (data) => {
	const newPersonnelRole = await prisma.personnelRoles.create({
		data: {
			personnel_id: data.personnel_id,
			role_id: data.role_id,
			subjects: data.subjects,
			position: data.position,
		},
	});
	return newPersonnelRole;
};

export const updateById = async (id, data) => {
	const personnelRole = await prisma.personnelRoles.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!personnelRole) {
		const error = new Error("Personnel Role not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.personnelRoles.update({
		where: { id: Number(id) },
		data: {
			personnel_id: data.personnel_id,
			role_id: data.role_id,
			subjects: data.subjects,
			position: data.position,
		},
	});
};

export const deleteById = async (id) => {
	const personnelRole = await prisma.personnelRoles.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!personnelRole) {
		const error = new Error("Personnel Role not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.personnelRoles.delete({
		where: { id: Number(id) },
	});
};
