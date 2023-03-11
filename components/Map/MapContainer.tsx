import { useRouteContext } from "@/contexts";
import dynamic from "next/dynamic";
import { LatLngLiteral } from "@/domains";
import { LeafletMapProps } from "./LeafletMap";

const LeafletMap = dynamic<LeafletMapProps>(
  () => import("./LeafletMap").then((module) => module.LeafletMap),
  {
    ssr: false,
  }
);

export const MapContainer = () => {
  const { startPoint, finishPoint, crossingPoints } = useRouteContext();
  return (
    <div className="h-full">
      <LeafletMap
        startPoint={startPoint}
        finishPoint={finishPoint}
        crossingPoints={crossingPoints}
      />
    </div>
  );
};
