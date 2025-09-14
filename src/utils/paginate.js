/**
 * Paginates a model based on the given request
 * @param {Object} model - The model to paginate
 * @param {Object} req - The request object containing query parameters
 * @param {Object} [customWhere] - Custom where clause to filter the results
 * @param {Object} [customOrderBy] - Custom order clause to sort the results
 * @param {Object} [customSelect] - Custom select clause to select specific columns
 * @param {number} [defaultLimit] - The default limit to use if no limit is provided in the request
 * @throws {Error} - If the limit is not between 1 and 100, or if the page is not greater than 0
 * @returns {Promise<Object>} - An object containing the paginated data and pagination metadata
 */
export const paginate = async (
	model,
	req,
	customWhere = {},
	customOrderBy = {
		created_at: "desc",
	},
	customSelect = {},
	defaultLimit = 10
) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || defaultLimit;
	const offset = (page - 1) * limit;

	if (limit <= 0 || limit > 100) {
		throw new Error("Limit must be between 1 and 100");
	}

	if (page <= 0) {
		throw new Error("Page must be greater than 0");
	}

	const totalItems = await model.count({ where: customWhere });
	const items = await model.findMany({
		skip: offset,
		take: limit,
		where: customWhere,
		orderBy: customOrderBy,
		select: customSelect,
	});

	const totalPage = Math.ceil(totalItems / limit);
	const hasNextPage = page < totalPage;
	const hasPrevPage = page > 1;

	return {
		data: items,
		pagination: {
			page: page,
			limit: limit,
			totalItems: totalItems,
			totalPage: totalPage,
			hasNextPage: hasNextPage,
			hasPrevPage: hasPrevPage,
		},
	};
};
