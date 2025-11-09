import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z
        .coerce
        .number()
        .positive({ message: "invalid port number" }),
    MONGODB_URI: z
        .string({ message: "invalid mongo URI" })
        .trim(),
    JWT_SECRET: z
        .string({ message: "invalid JWT secret" })
        .trim(),
    CLOUDINARY_CLOUD_NAME: z
        .string({ message: "Invalid cloudinary cloud name." })
        .trim(),
    CLOUDINARY_API_KEY: z
        .string({ message: "Invalid cloudinary api key." })
        .trim(),
    CLOUDINARY_API_SECRET: z
        .string({ message: "Invalid cloudinary api secret." })
        .trim(),
});

const envSafe = envSchema.safeParse(process.env);

if (envSafe.error) {
    console.log("invalid environment variables: ", envSafe.error.issues[0].message);
    process.exit(-1);
}

export const env = envSafe.data;