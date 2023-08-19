//Page for reading the favorites list
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import logger from "../../lib/logger";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    return res.status(200).json(currentUser?.favoriteTitles);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).end();
  }
}
