import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { useRouteContext } from "@/contexts";
import { LatLngLiteral } from "@/domains";
import { createControlComponent } from "@react-leaflet/core";
import L, { Map } from "leaflet";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { MapEventListener, TapPopup } from "./components";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX || "";

export interface LeafletMapProps {
  startPoint: LatLngLiteral;
  crossingPoints?: LatLngLiteral[];
  finishPoint: LatLngLiteral;
  addCrossingPoint(coordinates: LatLngLiteral): void;
}

export const LeafletMap = ({
  startPoint,
  finishPoint,
  crossingPoints,
  addCrossingPoint,
}: LeafletMapProps) => {
  const [pointPosition, setPointPosition] = useState<LatLngLiteral>();
  const {
    updateStartAndFinishPoints,
    updatePointById,
    updateFinishPoint,
    removePointByCoordinates,
    updateStartPoint,
    routePoints,
  } = useRouteContext();
  const popupRef = useRef<L.Popup>(null);
  const [routeControl, setRouteControl] = useState<L.Routing.Control>();
  const mapRef = useRef<Map>(null);

  const waypoints = useMemo(() => {
    const convertedCrossingPoints = (routePoints ?? []).map((routePoint) =>
      L.latLng(routePoint?.coordinates.lat, routePoint?.coordinates.lng)
    );
    return convertedCrossingPoints;
  }, [routePoints]);

  //ta elevation se bude potitat z koordinatu co prijdou v props
  //tam bude start point atd

  // const { distance } = useDistance({
  //   coordinatesFrom: { lat: 49.1839069, lng: 16.5304978 },
  //   coordinatesTo: { lat: 49.1839069, lng: 16.7809511 },
  // });
  //turf.js na pocitani distance atd .. mozna i na pocitani elevation

  // const { data } = useElevation({
  //   coordinates: { lat: 49.0039069, lng: 16.1304978 },
  // });

  const handleOpen = (map: Map) => {
    popupRef?.current?.openOn(map);
  };

  const handleSavePointPosition = (coordinates: LatLngLiteral) => {
    setPointPosition(coordinates);
  };

  const handleAddNewPoint = () => {
    const currentWaypoints = routeControl?.getWaypoints() ?? [];

    if (pointPosition) {
      const newPoint = L.latLng(pointPosition);
      const newWaypoint = L.routing.waypoint(newPoint);

      console.log(newWaypoint, "way");
      routeControl?.setWaypoints([...currentWaypoints, newWaypoint]);

      addCrossingPoint(pointPosition);
    }
  };

  const createRoutingMachineLayer = useCallback(() => {
    const instance = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: "blue", weight: 2 }],
        extendToWaypoints: true,
        missingRouteTolerance: 20,
      },
      plan: L.Routing.plan(waypoints, {
        //this makes markers undraggable
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: i === 0 ? false : true,
          })
            .addEventListener("click", (e) => {
              removePointByCoordinates(e.latlng);
              // instance?.spliceWaypoints(i, 1);
            })
            .addEventListener("dragend", (e) => {
              // instance.spliceWaypoints(i, 1);
              updatePointById(routePoints[i].id, e.target._latlng);

              //co kdybych tu menil ty hodnoty, ale nesledoval bych ty zmeny
            });
        },
      }),
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
      router: L.Routing.mapbox(accessToken, {
        profile: "mapbox/cycling",
      }),
    })
      .on("waypointschanged", function (e) {
        setPointPosition(undefined);
        console.log("waypoints add");
      })
      .on("routeselected", function (e) {
        console.log("route selected");

        //e.route vraci i distance
        // setPointPosition(undefined);
        const waypoints = e.route.waypoints;
      });
    setRouteControl(instance);
    return instance;

    //nepotrebuju, aby se prerendrovavalo to memo pri zmene zacatecniho a koncovyho bodu, jen pri prujezdovym
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoints]);

  const RoutingMachine = useMemo(
    () => createControlComponent(createRoutingMachineLayer),
    [createRoutingMachineLayer]
  );

  return (
    <>
      {waypoints && (
        <MapContainer
          center={[50.0343092, 15.7811994]}
          zoom={13}
          id="map-box"
          scrollWheelZoom={false}
          className="z-0 h-full"
          zoomControl={false}
          ref={mapRef}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/kapaakinos/clevb09lv001n01lsal61f8ys/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
          />
          <MapEventListener
            onClick={handleSavePointPosition}
            openPopup={handleOpen}
          />

          {startPoint && <RoutingMachine />}

          {pointPosition && (
            <TapPopup
              ref={popupRef}
              position={pointPosition}
              onTap={handleAddNewPoint}
            />
          )}
        </MapContainer>
      )}
    </>
  );
};

// const handleElevation = async () => {
//   const fromLatLng = L.latLng({ lat: 49.1839069, lng: 16.5304978 });
//   const toLatLng = L.latLng({ lat: 49.1839069, lng: 16.7809511 });

//   const dis = fromLatLng.distanceTo(toLatLng);

//   console.log(dis, "dis"); //distance in meters

//   const query = await fetch(
//     `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${16.7809511},${49.1839069}.json?layers=contour&limit=50&access_token=${accessToken}`,
//     { method: "GET" }
//   );

//   const data = await query.json();

//   const allFeatures = data.features;

//   // const elevations = allFeatures.map((feature) => feature.properties.ele);

//   // const highestElevation = Math.max(...elevations);
//   // console.log(highestElevation);
// };
