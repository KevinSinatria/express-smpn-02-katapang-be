import prisma from "../config/prisma.js";

export const findAll = async () => {
	return await prisma.personnel.findMany({
		select: {
			id: true,
			name: true,
			image_url: true,
			active: true,
			personnel_role: {
				select: {
					subjects: true,
					position: true,
					role: {
						select: {
							name: true,
						},
					},
				},
			},
			created_at: true,
			updated_at: true,
		},
	});
};

export const create = async (data) => {
	const newPersonnel = await prisma.personnel.create({
		data: {
			name: data.name,
			image_url: data.image_url,
			active: data.active,
		},
	});

	await prisma.personnelRoles.create({
		data: {
			personnel_id: newPersonnel.id,
			role_id: data.personnel_role.role_id,
			subjects: data.personnel_role.subjects,
			position: data.personnel_role.position,
		},
	});

	return newPersonnel;
};

export const findById = async (id) => {
	const personnel = await prisma.personnel.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
			name: true,
			image_url: true,
			active: true,
			personnel_role: {
				select: {
					role: {
						select: {
							name: true,
						},
					},
					subjects: true,
					position: true,
				},
			},
		},
	});

	if (!personnel) {
		const error = new Error("Personnel not found");
		error.code = "P2025";
		throw error;
	}

	return personnel;
};

export const updateById = async (id, data) => {
	const personnel = await prisma.personnel.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
			name: true,
			active: true,
			image_url: true,
		},
	});

   if(!personnel) {
      const error = new Error("Personnel not found");
      error.code = "P2025";
      throw error;
   }

	return await prisma.personnel.update({
		where: { id: Number(id) },
		data: {
			name: data.name,
			active: data.active,
			image_url: data.image_url ? data.image_url : personnel.image_url,
		},
	});
};

export const deleteById = async (id) => {
   const personnel = await prisma.personnel.findUnique({
      where: { id: Number(id) },
      select: {
         id: true
      },
   });

   if(!personnel) {
      const error = new Error("Personnel not found");
      error.code = "P2025";
      throw error;
   }

	return await prisma.personnel.delete({
		where: { id: Number(id) },
	});
};
