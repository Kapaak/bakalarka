import { NextApiRequest, NextApiResponse } from "next";

import { getAllRoutes, getRouteById } from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.id) {
          const id = req.query.id as string;
          const route = await getRouteById(id);

          return res.send(route);
        } else {
          const routes = await getAllRoutes();

          console.log(routes, "rot");

          return res.send(routes);
        }
      }
    }
  } catch (e) {
    console.log(e, "err");
  }
};

export default handler;
