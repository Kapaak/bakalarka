import { useMemo } from "react";

import { RouteContextProvider } from "@/contexts";
import { GeneratedRoute } from "@/domains";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

import { CreateRoutePageScreen } from "../../screens";

const RouteEditPage = () => {
  const { data: session } = useSession();

  const userId = session?.user.id as string;

  const defaultRoute: GeneratedRoute = useMemo(() => {
    return {
      id: nanoid(),
      authorId: userId,
      createdAt: new Date(),
      detail: {
        name: "",
        regions: [],
        terrain: [],
        description: "",
        distance: 0,
        elevation: 0,
        interestingPlaces: [],
      },
      routePoints: [],
    };
  }, [userId]);

  return (
    <RouteContextProvider>
      <CreateRoutePageScreen route={defaultRoute} />
    </RouteContextProvider>
  );
};

export default RouteEditPage;
