import { uploadFileToGoogleDrive } from "../utils/googleDrive.js";
import * as GalleryPhotosRepository from "../repositories/galleryPhotos.repository.js";

const galleryFolderId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;

export const createGalleryPhotosByAlbumId = async (id, files) => {
	try {
		let uploadedFiles = [];
		for (const file of files) {
			const uniqueFileName = `gallery-${Date.now()}-${Math.round(
				Math.random() * 1e9
			)}`;
			const uploadedFile = await uploadFileToGoogleDrive(
				file,
				uniqueFileName,
				galleryFolderId
			);
			uploadedFiles.push({
				photo_url: "https://drive.google.com/uc?id=" + uploadedFile.id,
			});
		}

		return await GalleryPhotosRepository.createByAlbumId(id, uploadedFiles);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteGalleryPhotoById = async (id) => {
	try {
		const photo = await GalleryPhotosRepository.findById(id);
		photo.photo_url &&
			(await deleteFileFromGoogleDrive(photo.photo_url.split("id=")[1]));

		return await GalleryPhotosRepository.deleteById(id);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
