import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { useRouteContext } from "@/contexts";
import { LatLngLiteral, RoutePoint } from "@/domains";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { MapEventListener, RemovePopup, TapPopup } from "./components";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX || "";

interface LeafletMapProps {
  staticView?: boolean;
}

export const LeafletMap = ({ staticView }: LeafletMapProps) => {
  const [pointPosition, setPointPosition] = useState<LatLngLiteral | null>();
  const [removePopup, setRemovePopup] = useState<Partial<RoutePoint> | null>();
  const {
    changeDistance,
    updatePointById,
    removePointById,
    routePoints,
    addPointBeforeLast,
    allowAddCrossingPts,
  } = useRouteContext();
  const popupRef = useRef<L.Popup>(null);

  const waypoints = useMemo(
    () =>
      (routePoints ?? []).map((routePoint) =>
        L.latLng(routePoint?.coordinates.lat, routePoint?.coordinates.lng)
      ),
    [routePoints]
  );

  const handleSavePointPosition = (coordinates: LatLngLiteral) => {
    setPointPosition(coordinates);
  };

  const handleAddNewPoint = () => {
    if (pointPosition) {
      addPointBeforeLast(pointPosition);
    }
  };

  const handleRemovePoint = () => {
    if (
      removePopup?.coordinates?.lat &&
      removePopup?.coordinates?.lng &&
      removePopup?.id
    ) {
      removePointById(removePopup.id);

      setRemovePopup(null);
    }
  };

  const resetSelectedPoint = () => {
    setPointPosition(null);
    setRemovePopup(null);
  };

  useEffect(() => {
    setPointPosition(null);
  }, [allowAddCrossingPts]);

  const createRoutingMachineLayer = useCallback(() => {
    const instance = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: "blue", weight: 2 }],
        extendToWaypoints: true,
        missingRouteTolerance: 20,
      },
      plan: L.Routing.plan(waypoints, {
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: !staticView,
          })
            .addEventListener("click", (e) => {
              if (i > 0 && i < routePoints.length - 1) {
                setRemovePopup({
                  id: routePoints[i].id,
                  coordinates: e.target.getLatLng(),
                });
              }
              // instance?.spliceWaypoints(i, 1);
            })
            .addEventListener("dragend", (e) => {
              setTimeout(() => {
                updatePointById(routePoints[i].id, e.target.getLatLng());
              }, 300); //pokud bude removeLayer err, pridej vetsi timeout (500 bylo vzdy OK)
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
      })
      .on("routeselected", function (e) {
        setPointPosition(undefined);

        const distance = e.route.summary.totalDistance;
        changeDistance(distance);
      });

    return instance;

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
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/kapaakinos/cljg8ydp100aw01qs1bpl3sn2/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
          />
          {/* <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://dev.a.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png`}
          /> */}
          <MapEventListener
            onClick={handleSavePointPosition}
            onDoubleClick={() => popupRef.current?.closePopup()}
            onReset={resetSelectedPoint}
          />

          {waypoints && <RoutingMachine />}

          {pointPosition && !staticView && allowAddCrossingPts && (
            <TapPopup
              ref={popupRef}
              position={pointPosition}
              onTap={handleAddNewPoint}
            />
          )}

          {removePopup?.coordinates && (
            <RemovePopup
              ref={popupRef}
              position={removePopup.coordinates}
              onSubmit={handleRemovePoint}
            />
          )}
        </MapContainer>
      )}
    </>
  );
};

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
