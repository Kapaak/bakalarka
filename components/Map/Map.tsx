import { LatLngLiteral } from "@/domains";
import dynamic from "next/dynamic";

const LeafletMap = dynamic<{ startPoint?: LatLngLiteral }>(
  () => import("./LeafletMap").then((module) => module.LeafletMap),
  {
    ssr: false,
  }
);

interface MapProps {
  startPoint?: LatLngLiteral;
}

export const Map = ({ startPoint }: MapProps) => {
  return (
    <div className="h-full border border-red-500">
      <LeafletMap startPoint={startPoint} />
    </div>
  );
};
