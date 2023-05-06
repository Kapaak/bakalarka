import { useMemo } from "react";

import { RouteContextProvider } from "@/contexts";
import { GeneratedRoute } from "@/domains";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

import { CreateRoutePageScreen } from "../../screens";

const defaultRoute: GeneratedRoute = {
  id: nanoid(),
  authorId: "todo-from-session",
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
  routePoints: [
    {
      id: "0",
      coordinates: { lat: 0, lng: 0 },
      value: "",
    },
    {
      id: "1",
      coordinates: { lat: 0, lng: 0 },
      value: "",
    },
  ],
};

const RouteEditPage = () => {
  const session = useSession();

  console.log(session, "sess");

  const defaultRoute: GeneratedRoute = useMemo(() => {
    return {
      id: nanoid(),
      authorId: "todo-from-session",
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
      routePoints: [
        {
          id: "0",
          coordinates: { lat: 0, lng: 0 },
          value: "",
        },
        {
          id: "1",
          coordinates: { lat: 0, lng: 0 },
          value: "",
        },
      ],
    };
  }, []);

  return (
    <RouteContextProvider>
      <CreateRoutePageScreen route={defaultRoute} />
    </RouteContextProvider>
  );
};

export default RouteEditPage;
