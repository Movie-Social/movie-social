import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import logger from "@/lib/logger";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { title, score, poster, categories, details } = req.body;

    const existingMovie = await prismadb.movie.findFirst({
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
        // validate: {
        //   fields: ["title"],
        // },
      });
      console.log(newMovie, "posted? movie");
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
