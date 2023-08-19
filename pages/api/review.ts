import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { title, userId, rating, poster, review, usersName } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          title: title,
        },
      });

      // if (!existingMovie) {
      //   logger.fatal("Can't find the movie in the DB. Check casing");
      //   throw new Error("Movie does not exist in Mongodb");
      // }

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
          usersName,
        },
      });

      return res.status(200).json(movieReview);
    }
    return res.status(405).end();
  } catch (error: any) {
    console.log(error);
    return res.status(400).end();
  }
}
