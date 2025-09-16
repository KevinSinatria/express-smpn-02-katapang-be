import * as GalleryAlbumsRepository from "../repositories/galleryAlbums.repository.js";

export const getAllGalleryAlbums = async (req) => {
	try {
		const albums = await GalleryAlbumsRepository.findAll(req);
		return albums;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getGalleryAlbumById = async (id) => {
	try {
		const album = await GalleryAlbumsRepository.findById(id);
		return album;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createGalleryAlbum = async (data) => {
   try {
      const album = await GalleryAlbumsRepository.create(data);
      return album;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const updateGalleryAlbumById = async (id, data) => {
   try {
      const album = await GalleryAlbumsRepository.updateById(id, data);
      return album;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const deleteGalleryAlbumById = async (id) => {
   try {
      const album = await GalleryAlbumsRepository.deleteById(id);
      return album;
   } catch (error) {
      console.log(error);
      throw error;
   }
}