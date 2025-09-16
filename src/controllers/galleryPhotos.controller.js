import * as GalleryPhotosService from "../services/galleryPhotos.service.js";

export const createGalleryPhotosByAlbumId = async (req, res) => {
   try {
      const { id } = req.params;
      const galleryPhotos = await GalleryPhotosService.createGalleryPhotosByAlbumId(
         id,
         req.files
      );
      res.status(200).json({ success: true, data: galleryPhotos });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
}

export const deleteGalleryPhotoById = async (req, res) => {
   try {
      const {id} = req.params;
      const galleryPhoto = await GalleryPhotosService.deleteGalleryPhotoById(id);
      res.status(200).json({ success: true, data: galleryPhoto });
   } catch (error) {
      console.log(error);

      if (error.code == "P2025") {
         return res
            .status(404)
            .json({ success: false, message: "Gallery Photo not found" });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
   }
}