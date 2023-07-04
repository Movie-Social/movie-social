import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
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
    const reviews = await prismadb.review.findMany({
      where: {
        userId: {
          in: currentUser?.id,
        },
      },
    });

    return res.status(200).json(reviews);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).end();
  }
}
