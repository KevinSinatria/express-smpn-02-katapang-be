import express from "express";
import * as GalleryAlbumsController from "../../controllers/galleryAlbums.controller.js";
import * as GalleryPhotosController from "../../controllers/galleryPhotos.controller.js";
import { uploadLotOfImages } from "../../config/multer.js";

const router = express.Router();

router.get("/", GalleryAlbumsController.getAllGalleryAlbums);
router.get("/:id", GalleryAlbumsController.getGalleryAlbumById);
router.post("/", GalleryAlbumsController.createGalleryAlbum);
router.put("/:id", GalleryAlbumsController.updateGalleryAlbumById);
router.delete("/:id", GalleryAlbumsController.deleteGalleryAlbumById);
router.post("/:id/photos", uploadLotOfImages, GalleryPhotosController.createGalleryPhotosByAlbumId);

export default router;
