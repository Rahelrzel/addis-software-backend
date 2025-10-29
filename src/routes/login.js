import express from "express";

import loginController from "../controllers/login.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/", validateBody(loginSchema), loginController);

export default router;
