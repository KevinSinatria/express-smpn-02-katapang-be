const validate = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false }); // abortEarly: false untuk mendapatkan semua error

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message.replace(/"/g, ""), // Menghilangkan kutipan di pesan Joi
    }));

    return res.status(400).json({
      success: false,
      message: "Validasi input gagal.",
      errors: errors,
    });
  }

  next();
};

export default validate;