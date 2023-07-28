import { NextApiRequest, NextApiResponse } from "next";

import { updateRatingById } from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        return res.send("GET");
      }
      case "POST": {
        if (req.query.id && req.body) {
          const id = req.query.id as string;

          //@ts-ignore
          const rating = req.body.rating as number;

          console.log(id, rating, "pepfff");

          const updateRating = await updateRatingById(id, rating);

          res.send(updateRating);
        }

        return res.send("POST");
      }
      case "PATCH": {
        return res.send("PATCH");
      }
      case "DELETE": {
        return res.send("DELETE");
      }
    }
  } catch (e) {
    console.log(e, "err");
  }
};

export default handler;
