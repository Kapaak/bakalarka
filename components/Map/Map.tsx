import { LatLngLiteral, MapOptions } from "@/domains";
import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { Places } from "./Places";

export const Map = () => {
  const [office, setOffice] = useState<LatLngLiteral>();

  const mapRef = useRef<GoogleMap>();

  const center = useMemo<LatLngLiteral>(() => ({ lat: 49, lng: 16 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "d8bed295e8601b2d", //vzhled mapy - ale nejak mi to nefunguje
      disableDefaultUI: true, //abych nevidel to ui kolem
      clickableIcons: false, //abych nemohl zaklikavat veci,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleSetStart = (position: any) => {
    setOffice(position);
    mapRef.current?.panTo(position);
  };

  return (
    <div className="h-[inherit]">
      <Places setStart={handleSetStart} />
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ height: "inherit" }}
        // options={options}
        options={options}
        onLoad={onLoad}
      ></GoogleMap>
    </div>
  );
};
