import * as PersonnelService from "../services/personnel.service.js";

export const getAllPersonnel = async (req, res) => {
	try {
		const personnel = await PersonnelService.getAllPersonnel();
		res.status(200).json({
			success: true,
			message: "Personnel fetched successfully",
			data: personnel,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createPersonnel = async (req, res) => {
	try {
		const personnel = await PersonnelService.createPersonnel(
			req.body,
			req.file
		);
		res.status(201).json({
			success: true,
			message: "Personnel created successfully",
			data: personnel,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getPersonnelById = async (req, res) => {
	try {
		const { id } = req.params;
		const personnel = await PersonnelService.getPersonnelById(id);
		res.status(200).json({
			success: true,
			message: "Personnel fetched successfully",
			data: personnel,
		});
	} catch (error) {
		console.log(error);
		if (error.code === "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Personnel not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updatePersonnelById = async (req, res) => {
	try {
		const { id } = req.params;
		const personnel = await PersonnelService.updatePersonnelById(id, req.body);
		res.status(200).json({
			success: true,
			message: "Personnel updated successfully",
			data: personnel,
		});
	} catch (error) {
		console.log(error);
		if (error.code === "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Personnel not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deletePersonnelById = async (req, res) => {
	try {
		const { id } = req.params;
		const personnel = await PersonnelService.deletePersonnelById(id);
		res.status(200).json({
			success: true,
			message: "Personnel deleted successfully",
			data: personnel,
		});
	} catch (error) {
		console.log(error);
		if (error.code === "P2025") {
			return res
				.status(404)
				.json({ success: false, message: "Personnel not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
