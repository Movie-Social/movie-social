import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { title, userId, rating, poster, review } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          title: title,
        },
      });

      if (!existingMovie) {
        logger.fatal("cant find the movie");
        throw new Error("Movie does not exist in Mongodb");
      }

      const existingUserReview = await prismadb.review.findMany({
        where: {
          userId: userId,
        },
      });

      if (existingUserReview.find((review) => review.title === title)) {
        return res
          .status(422)
          .json({ error: "Movie has already been reviewed" });
      }

      const movieReview = await prismadb.review.create({
        data: {
          poster,
          title,
          userId,
          rating,
          review,
        },
      });

      return res.status(200).json(movieReview);
    }
    return res.status(405).end();
  } catch (error: any) {
    logger.error(error);
    return res.status(400).end();
  }
}
