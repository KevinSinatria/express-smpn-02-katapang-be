import prisma from "../config/prisma.js";

export const createByAlbumId = async (id, data) => {
	const newGalleryPhotos = await prisma.galleryPhotos.createMany({
		data: data.map((photo) => ({ ...photo, album_id: Number(id) })),
	});

	return newGalleryPhotos;
};

export const findById = async (id) => {
   return await prisma.galleryPhotos.findUnique({
      where: { id: Number(id) },
      select: {
         id: true,
         photo_url: true,
      },
   });
}

export const deleteById = async (id) => {
   const galleryPhoto = await prisma.galleryPhotos.findUnique({
      where: { id: Number(id) },
      select: {
         id: true,
      },
   });

   if (!galleryPhoto) {
      const error = new Error("Gallery Photo not found");
      error.code = "P2025";
      throw error;
   }

	return await prisma.galleryPhotos.delete({
		where: { id: Number(id) },
	});
};
