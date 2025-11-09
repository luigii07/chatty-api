import { Router } from "express";
import * as userController from "@/controllers/user-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const userRoutes = Router();

userRoutes.get("/", ensureAuthenticated, userController.getUsersForSidebar);

export { userRoutes };