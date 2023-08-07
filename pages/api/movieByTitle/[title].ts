import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import logger from "../../../lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const movie = await prismadb.movie.findUnique({
      where: {
        title: req.query.title?.toString(),
      },
    });
    if (!movie) {
      return res.status(200).json("");
    }
    return res.status(200).json(movie.id);
  } catch (error) {
    logger.error(error);
  }
}
