import { PrismaClient } from "@prisma/client";

//saving prisma client in a global file since global files are not affected by hot reloading
// I will not need to do this in production
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prismadb = client;

export default client;
