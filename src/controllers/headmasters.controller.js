import * as HeadmastersService from "../services/headmasters.service.js";

export const getAllHeadmasters = async (req, res) => {
	try {
		const headmasters = await HeadmastersService.getAllHeadmasters(req);
		res
			.status(200)
			.json({
				success: true,
				data: headmasters.data,
				meta: headmasters.pagination,
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getHeadmasterById = async (req, res) => {
	try {
		const { id } = req.params;
		const headmaster = await HeadmastersService.getHeadmasterById(id);
		res.status(200).json({ success: true, data: headmaster });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createHeadmaster = async (req, res) => {
	try {
		const headmaster = await HeadmastersService.createHeadmaster(req.body);
		res.status(201).json({ success: true, data: headmaster });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateHeadmasterById = async (req, res) => {
	try {
		const { id } = req.params;
		const headmaster = await HeadmastersService.updateHeadmasterById(
			id,
			req.body
		);
		res.status(200).json({ success: true, data: headmaster });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteHeadmasterById = async (req, res) => {
	try {
		const { id } = req.params;
		await HeadmastersService.deleteHeadmasterById(id);
		res
			.status(200)
			.json({ success: true, message: "Headmaster deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
