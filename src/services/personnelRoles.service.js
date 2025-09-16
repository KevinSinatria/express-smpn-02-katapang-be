import * as PersonnelRolesRepository from "../repositories/personnelRoles.repository.js";

export const createPersonnelRole = async (data) => {
	try {
		const newPersonnelRole = await PersonnelRolesRepository.create(data);
		return newPersonnelRole;
	} catch (error) {
		throw error;
	}
};

export const updatePersonnelRoleById = async (id, data) => {
	try {
		const personnelRole = await PersonnelRolesRepository.updateById(id, data);
		return personnelRole;
	} catch (error) {
		throw error;
	}
};

export const deletePersonnelRoleById = async (id) => {
	try {
		const personnelRole = await PersonnelRolesRepository.deleteById(id);
		return personnelRole;
	} catch (error) {
		throw error;
	}
};
