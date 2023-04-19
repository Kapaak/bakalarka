import { GetServerSideProps, NextPage } from "next";

import { RouteContextProvider } from "@/contexts";
import { Route } from "@/domains";

import { RouteEditPageScreen } from "../../../../screens";

interface RouteEditPageProps {
  route: Route;
}

const RouteEditPage: NextPage<RouteEditPageProps> = ({ route }) => {
  return (
    <RouteContextProvider>
      <RouteEditPageScreen route={route} />
    </RouteContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<{ route: Route }> = async (
  ctx
) => {
  // const { routeId } = ctx.query;

  // const routeValue = routeId as string;

  // const route = (await getRouteByValue(routeValue)) as Route;

  // if (!route) return { notFound: true };

  // route.createdAt = JSON.stringify(route.createdAt);

  return {
    props: {
      // route,
      route: [],
    },
  };
};

export default RouteEditPage;
