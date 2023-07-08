import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
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
    }

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

    if (
      (transactionResult as any) instanceof Prisma.PrismaClientKnownRequestError
    ) {
      logger.error(transactionResult?.message);
      return res.status(400).end();
    }
    return res.status(200).json(transactionResult);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).end();
  }
}
