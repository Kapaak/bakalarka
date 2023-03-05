import dynamic from "next/dynamic";
import { Suspense } from "react";
// import { Sracka } from "./Sracka";
const LeafletMap = dynamic<{}>(
  () => import("./LeafletMap").then((module) => module.LeafletMap),
  {
    ssr: false,
  }
);

export const Map = () => {
  return (
    <div className="h-full border border-red-500">
      <LeafletMap />
    </div>
  );
};
