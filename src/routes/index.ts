import { Router } from "express";
import { authRoutes } from "./auth-route";
import { userRoutes } from "./user-route";
import { messageRoutes } from "./message-routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/messages", messageRoutes);

export { routes }