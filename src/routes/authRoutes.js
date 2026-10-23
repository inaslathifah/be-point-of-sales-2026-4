import { Router } from "express";
import { login, me } from "../controllers/AuthController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { loginSchema } from "../validation/auth.validation.js";
import { verifyToken } from "../middlewares/middleware.js";

const authRoutes = Router();

authRoutes.post("/login", validate(loginSchema), login);
authRoutes.get("/me", verifyToken, me);

export default authRoutes;
