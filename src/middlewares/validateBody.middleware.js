import { ZodError } from "zod";

export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        errors: err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      });
    }

    console.error("Unexpected validation error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error during validation",
    });
  }
};
