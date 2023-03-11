import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { LatLngLiteral } from "@/domains";

const greenIcon = new L.Icon({
  iconUrl: "/icons/map_pin_start.svg",
});

const accessToken =
  "pk.eyJ1Ijoia2FwYWFraW5vcyIsImEiOiJjbGV2YWp1OWQwcmxuM3FvN2g5cHh5ZWhrIn0.HKjc7CJ_vDFEx8DoyPnhBA";

interface LeafletMapProps {
  startPoint?: LatLngLiteral;
}

export const LeafletMap = ({ startPoint }: LeafletMapProps) => {
  const createRoutingMachineLayer = (props) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(startPoint?.lat, startPoint?.lng),
        // L.latLng(49.1839069, 16.5304978),
        L.latLng(49.1839069, 16.7809511),
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
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

    const elevations = allFeatures.map((feature) => feature.properties.ele);

    const highestElevation = Math.max(...elevations);
    console.log(highestElevation);
  };
  return (
    <MapContainer
      center={[50.0343092, 15.7811994]}
      zoom={13}
      id="map-box"
      scrollWheelZoom={false}
      className="z-0 h-full"
    >
      <button type="button" onClick={handleElevation}>
        show
      </button>
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
    </MapContainer>
  );
};
