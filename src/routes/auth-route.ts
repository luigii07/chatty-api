import { Router } from "express";
import * as authController from "@/controllers/auth-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.put("/update-profile", ensureAuthenticated, authController.updateProfile);

authRoutes.get("/check", ensureAuthenticated, authController.check);

export { authRoutes }