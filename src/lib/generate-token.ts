import { Response } from "express";
import { sign } from "jsonwebtoken";
import { env } from "@/env";
import mongoose from "mongoose";

export const generateToken = (userId: mongoose.Types.ObjectId, res: Response) => {
    const token = sign({}, env.JWT_SECRET, {
        subject: String(userId),
        expiresIn: "1h",
    });
    
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/",
        domain: isProduction ? "chatty-api-ksyc.onrender.com" : "localhost",
    });

    return token;
};