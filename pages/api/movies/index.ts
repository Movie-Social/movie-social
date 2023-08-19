import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);
    const movies = await prismadb.movie.findMany();
    // console.log(movies, "movies");
    return res.status(200).json(movies);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).end();
  }
}
