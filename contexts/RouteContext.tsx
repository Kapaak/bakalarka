import { createContext, PropsWithChildren, useContext } from "react";

import { LatLngLiteral, TranslatedPoints } from "@/domains";
import { useRoute } from "@/hooks";

type RouteContextType = {
  startPoint: LatLngLiteral;
  finishPoint: LatLngLiteral;
  crossingPoints: LatLngLiteral[];
  translatedPoints: TranslatedPoints;
  updateStartPoint(coordinates: LatLngLiteral): void;
  updateFinishPoint(coordinates: LatLngLiteral): void;
  updateStartAndFinishPoints(
    startPoint: LatLngLiteral,
    finishPoint: LatLngLiteral
  ): void;
  addCrossingPoint(coordinates: LatLngLiteral): void;
  removePointByCoordinates(coordinates: LatLngLiteral): void;
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
  translatedPoints: { startPoint: "", finishPoint: "", crossingPoints: [] },
  updateStartPoint: () => {},
  updateFinishPoint: () => {},
  updateStartAndFinishPoints: () => {},
  addCrossingPoint: () => [],
  removePointByCoordinates: () => {},
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
