import { NextApiRequest, NextApiResponse } from "next";

import { getAllRoutes, getRouteById } from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.id) {
          const id = req.query.id as string;
          console.log("req.query.id", req.query.id);

          const user = await getRouteById(id);

          return res.send(user);
        } else {
          const users = await getAllRoutes();

          return res.send(users);
        }
      }
    }
  } catch (e) {
    console.log(e, "err");
  }
};

export default handler;
