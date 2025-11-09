import cloudinary from "@/lib/cloudinary";
import Message from "@/models/message-model";
import { paramsSchema, sendMessageSchema } from "@/schemas/message-schema";
import { Request, Response } from "express";
import { io, getReceiverSocketId } from "@/app";

export const sendMessage = async (req: Request, res: Response) => {
    const { text, image } = sendMessageSchema.parse(req.body);
    const { receiverId } = paramsSchema.parse(req.params);
    const senderId = req.userId;

    let imageURL;

    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageURL,
    });

    await newMessage.save();

    const userToChatId = getReceiverSocketId(receiverId);
    if (userToChatId) {
        io.to(userToChatId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
};

export const getMessages = async (req: Request, res: Response) => {
    const myId = req.userId;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ]
    });

    return res.status(200).json(messages);
};