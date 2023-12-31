import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { title } = req.body;
    const allReviews = await prismadb.review.findMany({
      where: {
        title: title,
      },
    });
    return res.status(200).json(allReviews);
  } catch (error: any) {
    console.log(error.message);
  }
}
