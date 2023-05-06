import { NextApiRequest, NextApiResponse } from "next";

import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRouteById,
} from "@/prisma";

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

          return res.send(routes);
        }
      }
      case "PATCH": {
        if (req.query.id && req.body) {
          const id = req.query.id as string;
          const data = req.body;

          const updatedRoute = await updateRouteById(id, data);

          return res.send(updatedRoute);
        }
      }
      case "POST": {
        const newRoute = await createRoute(req.body);

        return res.send(newRoute);
      }
    }
  } catch (e) {
    console.log(e, "err");
  }
};

export default handler;
