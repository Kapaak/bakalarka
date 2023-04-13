import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((module) => module.LeafletMap),
  {
    ssr: false,
  }
);

export const MapContainer = () => {
  return (
    <div className="h-[inherit] w-full lg:h-full">
      <LeafletMap />
    </div>
  );
};
