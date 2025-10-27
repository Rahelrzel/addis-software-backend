import express from "express";

import registerController from "../controllers/register.Controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { registerSchema } from "../schema/authValidation.js";

const router = express.Router();

router.post("/", registerController, validateBody(registerSchema));

export default router;
