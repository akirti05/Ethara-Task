// src/utils/response.js

const success = (res, data, statusCode = 200, meta = null) => {
    const payload = { success: true, data };
    if (meta) payload.meta = meta;
    return res.status(statusCode).json(payload);
  };
  
  const paginated = (res, data, total, page = 1, limit = 10) => {
    return success(res, data, 200, {
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  };
  
  module.exports = { success, paginated };