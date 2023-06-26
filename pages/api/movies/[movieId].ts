import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;
    if (typeof movieId !== "string") {
      logger.info("No movie exists for fetching its details");
      throw new Error("Invalid ID");
    }

    if (!movieId) {
      logger.info("No movie exists for fetching its details");
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      logger.info("No movie exists for fetching its details");
      throw new Error("Invalid ID");
    }

    res.status(200).json(movie);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).end();
  }
}