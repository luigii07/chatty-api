import User from "@/models/user-model";
import { Request, Response } from "express";

export const getUsersForSidebar = async (req: Request, res: Response) => {
    const loggedInUserId = req.userId;

    const users = await User.find({ _id: { $ne: loggedInUserId }}).select("-password -updatedAt -__v");

    return res.status(200).json(users);
};