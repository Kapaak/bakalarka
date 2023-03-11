import { useRouteContext } from "@/contexts";
import { Map } from "./Map";

export const MapContainer = () => {
  // const libraries = useMemo<Libraries>(() => ["places"], []);

  // const { isLoaded } = useLoadScript({
  //   //to isloaded tu nedava smysl ... kam s tim ale, tam jak jsou ty vyhledavani ?
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || "",
  //   libraries,
  // });

  const { startPoint } = useRouteContext();
  //teoreticky ale timhle muzu ohandlovat to, kdy bude mapa rdy

  // if (!isLoaded) return <div>Načítá....</div>;
  return (
    <div className="h-full ">
      <Map startPoint={startPoint} />
    </div>
  );
};
