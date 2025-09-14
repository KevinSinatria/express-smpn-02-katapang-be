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
