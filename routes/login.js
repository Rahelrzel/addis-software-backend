import express from "express";

import loginController from "../controllers/login.Controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { loginSchema } from "../schema/authValidation.js";

const router = express.Router();

router.post("/", validateBody(loginSchema), loginController);

export default router;
