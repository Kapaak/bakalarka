import { GetServerSideProps, NextPage } from "next";

import { RouteContextProvider } from "@/contexts";
import { GeneratedRoute } from "@/domains";
import { RoutePageScreen } from "@/screens";
import { getRouteById } from "prisma/route";

interface RoutePageProps {
  route: GeneratedRoute;
}

export const RoutePage: NextPage<RoutePageProps> = ({ route }) => {
  return (
    <RouteContextProvider>
      <RoutePageScreen route={route} />
    </RouteContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<{
  route: GeneratedRoute;
}> = async (ctx) => {
  const { routeId } = ctx.query;

  const route = await getRouteById(routeId as string);

  if (!route) return { notFound: true };

  //@ts-ignore Have to convert date to string so that I can pass it in props
  route.createdAt = JSON.stringify(route.createdAt);

  return {
    props: {
      route,
    },
  };
};

export default RoutePage;
