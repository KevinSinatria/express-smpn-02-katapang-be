import * as PersonnelRolesService from "../services/personnelRoles.service.js";

export const createPersonnelRole = async (req, res) => {
	try {
		const personnelRole = await PersonnelRolesService.createPersonnelRole(
			req.body
		);
		res.status(201).json({
			success: true,
			message: "Personnel role created successfully",
			data: personnelRole,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updatePersonnelRoleById = async (req, res) => {
	try {
		const { id } = req.params;
		const personnelRole = await PersonnelRolesService.updatePersonnelRoleById(
			id,
			req.body
		);
		res.status(200).json({
			success: true,
			message: "Personnel role updated successfully",
			data: personnelRole,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deletePersonnelRoleById = async (req, res) => {
	try {
		const { id } = req.params;
		await PersonnelRolesService.deletePersonnelRoleById(id);
		res.status(200).json({
			success: true,
			message: "Personnel role deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
