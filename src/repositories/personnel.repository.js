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
							role: true,
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

	// await prisma.personnelRole.create({
	// 	data: {
	// 		personnel_id: newPersonnel.id,
	// 		role_id: data.role_id,
	// 		subjects: data.subjects,
	// 		position: data.position,
	// 	},
	// });

	return newPersonnel;
};
