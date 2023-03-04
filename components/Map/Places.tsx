import { LatLngLiteral } from "@/domains";
import { GoogleAutocomplete } from "@/ui";
// import GoogleAutocomplete from "react-google-autocomplete";
import usePlacesAutocomplete from "use-places-autocomplete";

interface PlacesProps {
  setStart(position: LatLngLiteral): void;
}
// https://www.youtube.com/watch?v=2po9_CIRW7I 25:36
export const Places = ({ setStart }: PlacesProps) => {
  const handleSelect = (lat: number, lng: number) => {
    setStart({ lat, lng });
  };

  return (
    <div className="z-50 border border-blue-500">
      <p>Places</p>
      <GoogleAutocomplete onSelect={handleSelect} />
      {/* <GoogleAutocomplete //netreba, muzu smazat
        options={{ componentRestrictions: { country: "cz" } }}
      /> */}
    </div>
  );
};
