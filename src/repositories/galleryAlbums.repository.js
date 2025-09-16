import prisma from "../config/prisma.js";
import { paginate } from "../utils/paginate.js";

export const findAll = async (req) => {
	const galleryAlbums = await paginate(
		prisma.galleryAlbums,
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

	return galleryAlbums;
};

export const findById = async (id) => {
	const galleryAlbum = await prisma.galleryAlbums.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			name: true,
			created_at: true,
			updated_at: true,
			photos: {
				select: {
					photo_url: true,
				},
			},
		},
	});

	if (!galleryAlbum) {
		const error = new Error("Gallery Album not found");
		error.code = "P2025";
		throw error;
	}

	return galleryAlbum;
};

export const create = async (data) => {
	const newGalleryAlbum = await prisma.galleryAlbums.create({
		data: {
			name: data.name,
		},
	});
	return newGalleryAlbum;
};

export const updateById = async (id, data) => {
	const galleryAlbum = await prisma.galleryAlbums.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!galleryAlbum) {
		const error = new Error("Gallery Album not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.galleryAlbums.update({
		where: { id: Number(id) },
		data: {
			name: data.name,
		},
	});
};

export const deleteById = async (id) => {
	const galleryAlbum = await prisma.galleryAlbums.findUnique({
		where: { id: Number(id) },
		select: {
			id: true,
		},
	});

	if (!galleryAlbum) {
		const error = new Error("Gallery Album not found");
		error.code = "P2025";
		throw error;
	}

	return await prisma.galleryAlbums.delete({
		where: { id: Number(id) },
	});
};
