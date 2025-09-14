import * as RoleRepository from "../repositories/roles.repository.js";

/**
 * Mendapatkan semua role yang ada di database
 * @param {Object} req - object request yang berisi query
 * @return {Promise<Object[]>} - promise yang berisi array of object
 */
export const getAllRoles = async (req) => {
	return await RoleRepository.findAll(req);
};

/**
 * Mendapatkan role berdasarkan id yang diberikan
 * @param {number} id - id role yang ingin di dapatkan
 * @return {Promise<Object>} - promise yang berisi object role
 */
export const getRoleById = async (id) => {
	return await RoleRepository.findById(id);
};

/**
 * Membuat role baru di database
 * @param {Object} data - objek role yang ingin di buat
 * @return {Promise<Object>} - promise yang berisi objek role yang baru di buat
 */
export const createRole = async (data) => {
	return await RoleRepository.create(data);
};

/**
 * Mengupdate role yang ada di database berdasarkan id
 * @param {number} id - id role yang ingin di update
 * @param {Object} data - objek role yang ingin di update
 * @return {Promise<Object>} - promise yang berisi objek role yang telah di update
 */
export const updateRoleById = async (id, data) => {
	return await RoleRepository.updateById(id, data);
};

/**
 * Menghapus role yang ada di database berdasarkan id
 * @param {number} id - id role yang ingin di hapus
 * @return {Promise<void>} - promise yang berisi void jika berhasil menghapus
 */
export const deleteRoleById = async (id) => {
	return await RoleRepository.deleteById(id);
};
