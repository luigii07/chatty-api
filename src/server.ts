import { server } from "@/app";
import { env } from "./env";
import { connectDB } from "./lib/mongo";

server.listen(env.PORT, () => {
    console.log(`server is runing on port ${env.PORT}`);
    connectDB();
});