import * as PersonnelRepository from "../repositories/personnel.repository.js";
import { uploadFileToGoogleDrive } from "../utils/googleDrive.js";

const personnelFolderId = process.env.GOOGLE_DRIVE_PERSONNEL_FOLDER_ID;

export const getAllPersonnel = async () => {
	try {
		return await PersonnelRepository.findAll();
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createPersonnel = async (dataBody, file) => {
	try {
		const uniqueFileName = `personnel-${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}`;
		const uploadedFile = await uploadFileToGoogleDrive(
			file,
			uniqueFileName,
			personnelFolderId
		);

		const personnelData = {
			name: dataBody.name,
			image_url: `https://drive.google.com/uc?id=${uploadedFile.id}`,
			active: Boolean(dataBody.active),
			// personnel_role: {
			//    role_id: Number(dataBody.role_id),
			//    subjects: dataBody.subjects,
			//    position: dataBody.position,
			// },
		};

		return await PersonnelRepository.create(personnelData);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
