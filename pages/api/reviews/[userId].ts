import serverAuth from "@/lib/serverAuth";
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
    console.log(error.message);
    return res.status(400).end();
  }
}
