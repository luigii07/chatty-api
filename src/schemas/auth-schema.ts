import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, { message: "Enter a valid full name, minimum 2 characters." }),
    email: z
        .email({ message: "Invalid email." }),
    password: z
        .string()
        .trim()
        .min(6, { message: "Password must be at least min 6 characters." }),
});

export const loginSchema = z.object({
    email: z
        .email({ message: "Invalid email." }),
    password: z
        .string({ message: "Inform your password." })
        .trim(),
});


export const updateProfileSchema = z.object({
    avatar: z
        .string(),
});