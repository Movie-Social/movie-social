import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const {
      title,
      year,
      rating,
      runtime,
      trailer,
      summary,
      reviewCount,
      cast,
      boxOffice,
      director,
      writer,
      imdbRating,
      metascore,
      movieId,
      poster,
      ratings,
      releaseDate,
      categories,
    } = req.body;

    const existingMovieDetails = await prismadb.movieDetails.findUnique({
      where: {
        title: title,
      },
    });

    if (existingMovieDetails) {
      return res.status(200).json({ message: "Movie Already exists" });
    } else {
      const transactionResult = await prismadb.$transaction(async (prisma) => {
        const newMovie = await prismadb.movie.create({
          data: {
            title,
            year,
            rating,
            runtime,
            trailer,
            summary,
            reviewCount,
            cast,
            boxOffice,
            director,
            writer,
            imdbRating,
            metascore,
            movieId,
            poster,
            ratings,
            releaseDate,
            categories,
          },
        });
        return newMovie;
      });
      return res.status(200).json(transactionResult);
    }
  } catch (error: any) {
    logger.error(error.message);
  }
}
