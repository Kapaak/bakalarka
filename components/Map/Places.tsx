import { LatLngLiteral } from "@/domains";
import { Autocomplete } from "@/ui";
import usePlacesAutocomplete from "use-places-autocomplete";

interface PlacesProps {
  setStart(position: LatLngLiteral): void;
}
// https://www.youtube.com/watch?v=2po9_CIRW7I
export const Places = ({ setStart }: PlacesProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  return (
    <div>
      <p>Places</p>
      <button type="button" onClick={() => console.log(value, "val")}>
        val
      </button>
      {/* <Autocomplete /> */}
    </div>
  );
};
