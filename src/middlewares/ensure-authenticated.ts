import { env } from "@/env";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        throw new AppError("Unauthorized - JWT Token not found.", 401);
    }
    
    const { sub: userId } = verify(token, env.JWT_SECRET) as { sub: string };
    
    if (!userId) {
        throw new AppError("Unauthorized - JWT Token not found.", 401);
    }

    req.userId = userId;

    return next();
}