import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((module) => module.LeafletMap),
  {
    ssr: false,
  }
);

interface MapContainerProps {
  staticView?: boolean;
}

export const MapContainer = ({ staticView }: MapContainerProps) => {
  return (
    <div className="h-[inherit] w-full lg:h-full">
      <LeafletMap staticView={staticView} />
    </div>
  );
};
