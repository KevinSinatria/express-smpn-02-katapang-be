import * as PersonnelRepository from "../repositories/personnel.repository.js";
import {
	deleteFileFromGoogleDrive,
	uploadFileToGoogleDrive,
} from "../utils/googleDrive.js";

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
			personnel_role: {
				role_id: Number(dataBody.role_id),
				subjects: dataBody.subjects,
				position: dataBody.position,
			},
		};

		return await PersonnelRepository.create(personnelData);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getPersonnelById = async (id) => {
	try {
		return await PersonnelRepository.findById(id);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updatePersonnelById = async (id, data, file) => {
	try {
		if (file) {
			const uniqueFileName = `personnel-${Date.now()}-${Math.round(
				Math.random() * 1e9
			)}`;
			const uploadedFile = await uploadFileToGoogleDrive(
				file,
				uniqueFileName,
				personnelFolderId
			);

			data.image_url = `https://drive.google.com/uc?id=${uploadedFile.id}`;
		}

		return await PersonnelRepository.updateById(id, data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deletePersonnelById = async (id) => {
	try {
		const personnel = await PersonnelRepository.findById(id);
		personnel.image_url &&
			(await deleteFileFromGoogleDrive(personnel.image_url.split("id=")[1]));

		return await PersonnelRepository.deleteById(id);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
