import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import logger from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const title = req.body.movieTitle;

    const user = await prismadb.user.findUnique({
      where: {
        email: currentUser.email || "",
      },
    });

    if (!user) {
      throw new Error("Invalid email");
    }

    const updatedWatchlistIds = without(user.watchlistTitles, title);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        watchlistTitles: updatedWatchlistIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
