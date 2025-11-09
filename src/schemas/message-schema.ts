import { z } from "zod";

export const sendMessageSchema = z.object({
    text: z
        .string()
        .optional()
        .nullable(),
    image: z
        .string()
        .optional()
        .nullable(),
});

export const paramsSchema = z.object({
    receiverId: z
        .string({ message: "Invalid receiver ID" }),
});