import { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";

import { LatLngLiteral } from "@/domains";
import { useElevation } from "@/hooks";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

const greenIcon = new L.Icon({
  iconUrl: "/icons/map_pin_start.svg",
});

const accessToken = process.env.NEXT_PUBLIC_MAPBOX || "";

export interface LeafletMapProps {
  startPoint: LatLngLiteral;
  crossingPoints?: LatLngLiteral[];
  finishPoint: LatLngLiteral;
}

export const LeafletMap = ({
  startPoint,
  finishPoint,
  crossingPoints,
}: LeafletMapProps) => {
  const [position, setPosition] = useState(null);
  //ta elevation se bude potitat z koordinatu co prijdou v props
  //tam bude start point atd

  const { data } = useElevation({
    coordinates: { lat: 49.0039069, lng: 16.1304978 },
  });

  // const { distance } = useDistance({
  //   coordinatesFrom: { lat: 49.1839069, lng: 16.5304978 },
  //   coordinatesTo: { lat: 49.1839069, lng: 16.7809511 },
  // });

  //turf.js na pocitani distance atd .. mozna i na pocitani elevation
  const waypointsFromCoordinates = useMemo(() => {
    return (crossingPoints ?? []).map((crossingPoint) =>
      L.latLng(crossingPoint?.lat, crossingPoint?.lng)
    );
  }, [crossingPoints]);

  const createRoutingMachineLayer = () => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(startPoint?.lat, startPoint?.lng),
        ...waypointsFromCoordinates,
        L.latLng(finishPoint?.lat, finishPoint?.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 2 }],
        extendToWaypoints: true,
        missingRouteTolerance: 20,
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      // draggableWaypoints: true, //funguje i bez
      fitSelectedRoutes: true,
      showAlternatives: false,
      router: L.Routing.mapbox(accessToken, {
        profile: "mapbox/cycling",
      }),
      containerClassName: "map-box",
    });

    return instance;
  };

  const RoutingMachine = createControlComponent(createRoutingMachineLayer);

  const handleElevation = async () => {
    const fromLatLng = L.latLng({ lat: 49.1839069, lng: 16.5304978 });
    const toLatLng = L.latLng({ lat: 49.1839069, lng: 16.7809511 });

    const dis = fromLatLng.distanceTo(toLatLng);

    console.log(dis, "dis"); //distance in meters

    const query = await fetch(
      `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${16.7809511},${49.1839069}.json?layers=contour&limit=50&access_token=${accessToken}`,
      { method: "GET" }
    );

    const data = await query.json();

    const allFeatures = data.features;

    // const elevations = allFeatures.map((feature) => feature.properties.ele);

    // const highestElevation = Math.max(...elevations);
    // console.log(highestElevation);
  };

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });

    return null;
  };
  return (
    <MapContainer
      center={[50.0343092, 15.7811994]}
      zoom={13}
      id="map-box"
      scrollWheelZoom={false}
      className="z-0 h-full"
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      {/* <LocationFinderDummy /> */}
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/kapaakinos/clevb09lv001n01lsal61f8ys/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
      />
      {startPoint && <RoutingMachine />}
      {/* <Marker position={[50.0343092, 15.7811994]} icon={greenIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <MyComponent />
    </MapContainer>
  );
};

function MyComponent() {
  const map = useMapEvents({
    click: () => {
      map.locate();
      console.log("click");
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return null;
}
