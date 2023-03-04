import {
  DirectionsResult,
  LatLngLiteral,
  Map as MapType,
  MapOptions,
} from "@/domains";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Places } from "./Places";

const defaultStart = {
  lat: 50.0343092,
  lng: 15.7811994,
};
const defaultFinish = {
  lat: 50.0363092,
  lng: 15.7809511,
  // lng: 15.8811994,
};

export const Map = () => {
  const [start, setStart] = useState<LatLngLiteral>();
  const [finish, setFinish] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();

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
    setFinish(defaultFinish);
    mapRef.current?.panTo(position);
  };

  useEffect(() => {
    //todo remove
    handleSetStart(defaultStart);
  }, []);

  const fetchDirections = (point: LatLngLiteral) => {
    if (!start) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: defaultStart,
        destination: point,
        travelMode: google.maps.TravelMode.WALKING,
        // travelMode: google.maps.TravelMode.BICYCLING,//bicycling not working in czech :\
      },
      (result, status) => {
        console.log(result, "res", status, "status");

        if (status === "OK" && result) {
          setDirections(result);
          console.log(result, "result");
        }
      }
    );
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
        {directions && <DirectionsRenderer directions={directions} />}
        {start && (
          <Marker
            position={start}
            icon="/icons/map_pin_start.svg"
            onClick={() => fetchDirections(finish)}
          />
        )}
        {finish && (
          <Marker
            position={finish}
            icon="/icons/map_pin_finish.svg"
            options={{ draggable: true }}
            onDragEnd={(e) => {
              fetchDirections({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
              console.log("dragged", e.latLng?.lat(), e.latLng?.lng());
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};
