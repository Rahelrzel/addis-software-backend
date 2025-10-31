import express from "express";

import loginController from "../controllers/login.controller.js";
import { registerController } from "../controllers/register.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/login", validateBody(loginSchema), loginController);

router.post("/register", validateBody(registerSchema), registerController);

export default router;
