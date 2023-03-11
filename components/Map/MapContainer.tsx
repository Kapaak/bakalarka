import { useRouteContext } from "@/contexts";
import dynamic from "next/dynamic";
import { LatLngLiteral } from "@/domains";

const LeafletMap = dynamic<{
  startPoint: LatLngLiteral;
  finishPoint: LatLngLiteral;
}>(() => import("./LeafletMap").then((module) => module.LeafletMap), {
  ssr: false,
});

export const MapContainer = () => {
  const { startPoint, finishPoint } = useRouteContext();
  return (
    <div className="h-full">
      <LeafletMap startPoint={startPoint} finishPoint={finishPoint} />
    </div>
  );
};
