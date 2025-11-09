import { loginSchema, signUpSchema, updateProfileSchema } from "@/schemas/auth-schema";
import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "@/models/user-model";
import { AppError } from "@/utils/app-error";
import { generateToken } from "@/lib/generate-token";
import cloudinary from "@/lib/cloudinary";

export const signup = async (req: Request, res: Response) => {
    const { fullName, email, password } = signUpSchema.parse(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("This email has already been used.");
    }

    const hashPassword = await hash(password, 10);

    const newUser = new User({
        fullName,
        email,
        password: hashPassword,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Invalid email or password.", 401);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
        throw new AppError("Invalid email or password.", 401);
    }

    generateToken(user._id, res);

    return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
    });
};

export const check = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId);

    return res.status(200).json({
        _id: user?._id,
        fullName: user?.fullName,
        email: user?.email,
        avatar: user?.avatar,
        createdAt: user?.createdAt,
    });
};

export const updateProfile = async (req: Request, res: Response) => {
    const { avatar } = updateProfileSchema.parse(req.body);
    const userId = req.userId;

    const uploadResponse = await cloudinary.uploader.upload(avatar);
    const secureURL = uploadResponse.secure_url;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar: secureURL },
        { new: true },
    ).select("-password -updatedAt -__v");

    return res.status(201).json(updatedUser);
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};