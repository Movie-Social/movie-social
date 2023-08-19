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
    const heroCount = await prismadb.hero.count();
    const randomIndex = Math.floor(Math.random() * heroCount);

    //using pagination to fetch for one single movie.
    const randomMovies = await prismadb.hero.findMany({
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovies[0]);
  } catch (error: any) {
    console.log(error.message);
  }
}
