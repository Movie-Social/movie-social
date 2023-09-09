import { NextApiRequest, NextApiResponse } from "next";
// import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const oldReview = req.body.oldReview;
    const updatedReview = req.body.updatedReview;
    // const name = req.body.name;

    const newReview = await prismadb.review.update({
      where: {
        review: oldReview,
      },
      data: {
        review: updatedReview,
      },
    });

    // console.log(newReview, "newReview");

    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
