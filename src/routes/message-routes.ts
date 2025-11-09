import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import * as messageController from "@/controllers/message-controller";

const messageRoutes = Router();

messageRoutes.post("/send/:receiverId", ensureAuthenticated, messageController.sendMessage);
messageRoutes.get("/:id", ensureAuthenticated, messageController.getMessages);

export { messageRoutes };