import * as HeadmastersRepository from "../repositories/headmasters.repository.js";

export const getAllHeadmasters = async (req) => {
	try {
		return await HeadmastersRepository.findAll(req);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getHeadmasterById = async (id) => {
	try {
		return await HeadmastersRepository.findById(id);
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export const createHeadmaster = async (data) => {
	try {
		return await HeadmastersRepository.create(data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateHeadmasterById = async (id, data) => {
	try {
		return await HeadmastersRepository.updateById(id, data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteHeadmasterById = async (id) => {
	try {
		return await HeadmastersRepository.deleteById(id);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
