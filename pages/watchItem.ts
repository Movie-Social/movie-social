import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        watchlistIds: {
          push: movieId,
        },
      },
    });
    return res.status(200).json(user);
  }
}
