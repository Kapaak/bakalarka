import { GetServerSideProps, NextPage } from "next";

import { RouteContextProvider } from "@/contexts";
import { Route } from "@/domains";
import { RoutePageScreen } from "@/screens";
import { getRouteByValue } from "prisma/route";

interface RoutePageProps {
  route: Route;
}

export const RoutePage: NextPage<RoutePageProps> = ({ route }) => {
  return (
    <RouteContextProvider>
      <RoutePageScreen route={route} />
    </RouteContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<{ route: Route }> = async (
  ctx
) => {
  const { routeId } = ctx.query;

  const routeValue = routeId as string;

  const route = (await getRouteByValue(routeValue)) as Route;

  if (!route) return { notFound: true };

  route.createdAt = JSON.stringify(route.createdAt);

  return {
    props: {
      route,
    },
  };
};

export default RoutePage;
