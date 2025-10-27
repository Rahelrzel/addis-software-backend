export const validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};
