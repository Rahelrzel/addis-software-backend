import express from "express";

import { registerController } from "../controllers/register.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registerSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/", registerController, validateBody(registerSchema));

export default router;
