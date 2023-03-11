import { LatLngLiteral } from "@/domains";
import { useRoute } from "@/hooks";
import { createContext, PropsWithChildren, useContext } from "react";

type RouteContextType = {
  startPoint: LatLngLiteral;
  finishPoint: LatLngLiteral;
  crossingPoints: LatLngLiteral[];
  updateStartPoint(coordinates: LatLngLiteral): void;
  updateFinishPoint(coordinates: LatLngLiteral): void;
  addCrossingPoint(coordinates: LatLngLiteral): void;
  removeCrossingPointByIndex(index: number): void;
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
  crossingPoints: [],
  updateStartPoint: () => {},
  updateFinishPoint: () => {},
  addCrossingPoint: () => [],
  removeCrossingPointByIndex: () => [],
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
