import { useLoadScript } from "@react-google-maps/api";
import { useRouteContext } from "@/contexts";
import { useMemo } from "react";
import { Map } from "./Map";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export const MapContainer = () => {
  const libraries = useMemo<Libraries>(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    //to isloaded tu nedava smysl ... kam s tim ale, tam jak jsou ty vyhledavani ?
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || "",
    libraries,
  });

  const { startPoint } = useRouteContext();

  if (!isLoaded) return <div>Načítá....</div>;
  return (
    <div className="h-full ">
      <Map startPoint={startPoint} />
    </div>
  );
};
