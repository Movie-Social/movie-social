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
    const { title, score, poster, categories, details } = req.body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        title: title,
      },
    });

    if (existingMovie) {
      return res.status(200).json({ message: "Movie Already exists" });
    } else {
      const transactionResult = await prismadb.$transaction(async (prisma) => {
        const newMovie = await prismadb.movie.create({
          data: {
            title,
            score,
            poster,
            categories,
            details,
          },
        });
        return newMovie;
      });
      return res.status(200).json(transactionResult);
    }
  } catch (error: any) {
    logger.error(error.message);
    // Typically I would return a res.status(400) here but given the nature of the async request above
    // I don't want users to see an error page.
  }
}
