import { PrismaClient } from "@prisma/client";

//saving prisma client in a global file since global files are not affected by hot reloading but in production we do not do that to make
//sure everything is normal
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
