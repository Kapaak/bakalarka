import { LatLngLiteral } from "@/domains";
import { useRoute } from "@/hooks";
import { createContext, PropsWithChildren, useContext } from "react";

type RouteContextType = {
  startPoint: LatLngLiteral;
  finishPoint: LatLngLiteral;
  updateStartPoint(coordinates: LatLngLiteral): void;
  updateFinishPoint(coordinates: LatLngLiteral): void;
};

const defaultValues = {
  startPoint: {
    lng: 0,
    lat: 0,
  },
  finishPoint: {
    lng: 0,
    lat: 0,
  },
  updateStartPoint: () => {},
  updateFinishPoint: () => {},
};

const RouteContext = createContext<RouteContextType>(defaultValues);

export const RouteContextProvider = ({ children }: PropsWithChildren) => {
  const routeHook = useRoute();

  return (
    <RouteContext.Provider value={routeHook}>{children}</RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  return useContext(RouteContext);
};
