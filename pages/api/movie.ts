import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    // const { currentUser } = await serverAuth(req, res);

    const { title, score, poster, categories, details } = req.body;

    // const existingMovie = await prismadb.movie.findFirstOrThrow({
    //   where: {
    //     title: title,
    //   },
    // });

    // if (!existingMovie) {
    // logger.info
    const newMovie = await prismadb.movie.create({
      data: {
        title,
        score,
        poster,
        categories,
        details,
      },
    });
    console.log(newMovie, "posted? movie");
    return res.status(200).json(newMovie);
    // } else {
    //   // console.log("")
    //   return res.status(200).json({ message: "issue" });
    // }
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).end();
  }
}
