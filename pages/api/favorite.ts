//Route for adding and deleting movies to a favorites list
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const title = req.body.movieTitle;

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteTitles: {
            push: title,
          },
        },
      });
      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).end();
  }
}
