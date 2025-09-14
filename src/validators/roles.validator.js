import Joi from "joi";

export const rolesSchema = Joi.object({
	name: Joi.string().min(4).max(255).required().messages({
		"string.base": "Nama role harus berupa teks atau string.",
		"string.empty": "Nama role tidak boleh kosong.",
		"string.min": "Nama role minimal {{ #limit }} karakter.",
		"string.max": "Nama role maksimal {{ #limit }} karakter.",
		"any.required": "Nama role wajib diisi.",
	}),
});
