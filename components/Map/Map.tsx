import { LatLngLiteral, Map as MapType, MapOptions } from "@/domains";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { Places } from "./Places";

export const Map = () => {
  const [start, setStart] = useState<LatLngLiteral>();

  const mapRef = useRef<MapType>();

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 50.0343092, lng: 15.7811994 }),
    []
  );

  //promaz ty knihony z videa, co nepouzivam <)
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "d8bed295e8601b2d",
      disableDefaultUI: true, //abych nevidel to ui kolem
      clickableIcons: false, //abych nemohl zaklikavat veci,
    }),
    []
  );
  const onLoad = useCallback((map: MapType) => {
    mapRef.current = map;
  }, []);

  const handleSetStart = (position: any) => {
    setStart(position);
    mapRef.current?.panTo(position);
  };

  return (
    <div className="h-[inherit] overflow-hidden rounded-md">
      {/* <Places setStart={handleSetStart} /> */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ height: "inherit" }}
        options={options}
        onLoad={onLoad}
      >
        {start && <Marker position={start} icon="/icons/map_pin_start.svg" />}
      </GoogleMap>
    </div>
  );
};
