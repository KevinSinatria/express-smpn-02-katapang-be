import * as RolesService from "../services/roles.service.js";

export const getAllRoles = async (req, res) => {
	try {
		const roles = await RolesService.getAllRoles(req);
		res.status(200).json({
			success: true,
			message: "Roles fetched successfully",
			data: roles.data,
			meta: roles.pagination,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getRoleById = async (req, res) => {
	try {
		const { id } = req.params;
		const role = await RolesService.getRoleById(id);
		res.status(200).json({
			success: true,
			message: "Role fetched successfully",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createRole = async (req, res) => {
	try {
		const role = await RolesService.createRole(req.body);
		res.status(201).json({
			success: true,
			message: "Role created successfully",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateRoleById = async (req, res) => {
	try {
		const { id } = req.params;
		const role = await RolesService.updateRoleById(id, req.body);
		res.status(200).json({
			success: true,
			message: "Role updated successfully",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteRoleById = async (req, res) => {
	try {
		const { id } = req.params;
		const role = await RolesService.deleteRoleById(id);
		res.status(200).json({
			success: true,
			message: "Role deleted successfully",
			data: role,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
