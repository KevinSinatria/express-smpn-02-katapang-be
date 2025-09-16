import express from "express";
import * as GalleryAlbumsController from "../../controllers/galleryAlbums.controller.js";

const router = express.Router();

router.get("/", GalleryAlbumsController.getAllGalleryAlbums);
router.get("/:id", GalleryAlbumsController.getGalleryAlbumById);
router.post("/", GalleryAlbumsController.createGalleryAlbum);
router.put("/:id", GalleryAlbumsController.updateGalleryAlbumById);
router.delete("/:id", GalleryAlbumsController.deleteGalleryAlbumById);

export default router;
