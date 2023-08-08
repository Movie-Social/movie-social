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
    const { currentUser } = await serverAuth(req, res);
    const watchlist = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.watchlistTitles,
        },
      },
    });

    return res.status(200).json(watchlist);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).end();
  }
}
