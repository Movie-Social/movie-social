import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        logger.info("No movie exists");
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          reviewIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }
    return res.status(405).end();
  } catch (error: any) {
    logger.error(error);
    return res.status(400).end();
  }
}
