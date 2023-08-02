import { NextApiRequest, NextApiResponse } from "next";
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
    // const { title } = req.body;
    const allHeroOptions = await prismadb.review.findMany({
      //   where: {
      //     title: title,
      //   },
    });
    return res.status(200).json(allHeroOptions);
  } catch (error: any) {
    logger.error(error.message);
  }
}
