import { createContext, PropsWithChildren, useContext } from "react";

import { LatLngLiteral, RoutePoint } from "@/domains";
import { useRoutePoints } from "@/hooks";

type RouteContextType = {
  allowAddCrossingPts: boolean;
  toggleAddCrossingPts(): void;
  routePoints: RoutePoint[];
  addPointBeforeLast(coordinates?: LatLngLiteral): void;
  removePointById(id: string): void;
  updatePointById(id: string, coordinates: LatLngLiteral): void;
};

const defaultValues = {
  routePoints: [],
  toggleAddCrossingPts: () => void 0,
  allowAddCrossingPts: false,
  addPointBeforeLast: () => {},
  removePointById: () => {},
  updatePointById: () => {},
};

const RouteContext = createContext<RouteContextType>(defaultValues);

export const RouteContextProvider = ({ children }: PropsWithChildren) => {
  const routeHook = useRoutePoints();

  return (
    <RouteContext.Provider value={routeHook}>{children}</RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  return useContext(RouteContext);
};
