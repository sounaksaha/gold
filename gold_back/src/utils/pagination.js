export const paginate = async (
    Model,
    baseFilter = {},
    query = {},
    selectFields = '',
    populate = [] // Array of populate configurations
  ) => {
    const { page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;
  
    // Build the query with filtering, pagination, field selection, and sorting
    const queryBuilder = Model.find(baseFilter)
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ date: -1 }) // Sort by date in descending order (latest first)
      .select(selectFields);
  
    // Apply population if provided
    if (populate.length > 0) {
      populate.forEach((populateOption) => {
        queryBuilder.populate(populateOption);
      });
    }
  
    const [data, total] = await Promise.all([
      queryBuilder, // Execute the query
      Model.countDocuments(baseFilter), // Get the total count
    ]);
  
    const totalPages = Math.ceil(total / pageSize);
  
    return {
      count: total,
      current_page: Number(page),
      page_size: Number(pageSize),
      total_pages: totalPages,
      results: data,
    };
  };
  