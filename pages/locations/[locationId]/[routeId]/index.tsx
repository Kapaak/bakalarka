import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";

import { RouteContextProvider } from "@/contexts";
import { GeneratedRoute } from "@/domains";
import { getRouteById } from "@/prisma";
import { RoutePageScreen } from "@/screens";

import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

interface RoutePageProps {
  route: GeneratedRoute;
  isAuthor: boolean;
}

export const RoutePage: NextPage<RoutePageProps> = ({ route, isAuthor }) => {
  return (
    <RouteContextProvider>
      <RoutePageScreen route={route} isAuthor={isAuthor} />
    </RouteContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps<RoutePageProps> = async (
  ctx
) => {
  const { routeId } = ctx.query;

  const route = await getRouteById(routeId as string);

  if (!route) return { notFound: true };

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const isAuthor = session?.user.id === route?.authorId;

  //@ts-ignore Have to convert date to string so that I can pass it in props
  route.createdAt = JSON.stringify(route.createdAt);

  return {
    props: {
      route,
      isAuthor,
    },
  };
};

export default RoutePage;
