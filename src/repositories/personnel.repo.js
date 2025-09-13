import prisma from "../config/prisma.js";

export const findAll = async () => {
	return await prisma.personnel.findMany({
      select: {
         id: true,
         sam
      }
   })
};
