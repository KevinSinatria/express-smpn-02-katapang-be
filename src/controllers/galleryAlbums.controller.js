import * as GalleryAlbumsService from "../services/galleryAlbums.service.js";

export const getAllGalleryAlbums = async (req, res) => {
	try {
		const galleryAlbums = await GalleryAlbumsService.getAllGalleryAlbums(req);
		res
			.status(200)
			.json({
				success: true,
				data: galleryAlbums.data,
				meta: galleryAlbums.pagination,
			});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getGalleryAlbumById = async (req, res) => {
	try {
		const { id } = req.params;
		const galleryAlbum = await GalleryAlbumsService.getGalleryAlbumById(id);
		res.status(200).json({ success: true, data: galleryAlbum });
	} catch (error) {
		console.log(error);
		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Gallery Album not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createGalleryAlbum = async (req, res) => {
	try {
		const galleryAlbum = await GalleryAlbumsService.createGalleryAlbum(
			req.body
		);
		res.status(201).json({ success: true, data: galleryAlbum });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateGalleryAlbumById = async (req, res) => {
	try {
		const { id } = req.params;
		const galleryAlbum = await GalleryAlbumsService.updateGalleryAlbumById(
			id,
			req.body
		);
		res.status(200).json({ success: true, data: galleryAlbum });
	} catch (error) {
		console.log(error);
		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Gallery Album not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteGalleryAlbumById = async (req, res) => {
	try {
		const { id } = req.params;
		const galleryAlbum = await GalleryAlbumsService.deleteGalleryAlbumById(id);
		res.status(200).json({ success: true, data: galleryAlbum });
	} catch (error) {
		console.log(error);
		if (error.code == "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Gallery Album not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
