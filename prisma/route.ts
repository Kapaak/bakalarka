import { CreateRoute } from "@/domains";

import { prisma } from "./prisma";

export const getAllRoutes = async () => {
  const routes = await prisma.route.findMany({});

  return routes;
};

export const getRouteById = async (id: string) => {
  const route = await prisma.route.findUnique({
    where: { id },
  });
  return route;
};

export const createRoute = async ({
  authorId,
  name,
  description,
  distance,
  elevation,
  terrain,
  interestingPlaces,
}: CreateRoute) => {
  const newRoute = await prisma.route.create({
    data: {
      name,
      authorId,
      description,
      distance,
      elevation,
      terrain,
      interestingPlaces,
    },
  });
  return newRoute;
};
