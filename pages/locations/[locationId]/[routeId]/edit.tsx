import { GetServerSideProps, NextPage } from "next";

import { RouteContextProvider } from "@/contexts";
import { GeneratedRoute, Route } from "@/domains";
import { getRouteById } from "@/prisma";

import { RouteEditPageScreen } from "../../../../screens";

interface RouteEditPageProps {
  route: Route;
}

const RouteEditPage: NextPage<RouteEditPageProps> = ({ route }) => {
  return (
    <RouteContextProvider>
      {/* @ts-ignore */}
      <RouteEditPageScreen route={route} />
    </RouteContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<{
  route: GeneratedRoute;
}> = async (ctx) => {
  const { routeId } = ctx.query;

  const route = await getRouteById(routeId as string);

  if (!route) return { notFound: true };

  //nevim jestli to funguje
  route.createdAt = route.createdAt.toISOString() as unknown as Date;
  // route.createdAt = JSON.stringify(route.createdAt);

  return {
    props: {
      route,
    },
  };
};

export default RouteEditPage;
