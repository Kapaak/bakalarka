import { AutocompletePrediction } from "@/domains";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlass } from "phosphor-react";
import { Fragment, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface GoogleAutocompleteProps {
  onSelect?(lat: number, lng: number): void;
}

const defaultValue: AutocompletePrediction = {
  //middle of Czech Republic
  description: "Číhošť, Česko",
  matched_substrings: [{ length: 5, offset: 0 }],
  place_id: "ChIJ-5fImapQDEcRfKN8eSGpJLQ",
  structured_formatting: {
    main_text: "Číhošť",
    main_text_matched_substrings: [{ length: 5, offset: 0 }],
    secondary_text: "Česko",
  },
  terms: [
    { offset: 0, value: "Číhošť" },
    { offset: 8, value: "Česko" },
  ],
  types: ["locality", "political", "geocode"],
};

export const GoogleAutocomplete = ({ onSelect }: GoogleAutocompleteProps) => {
  const [selected, setSelected] =
    useState<AutocompletePrediction>(defaultValue);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    cacheKey: "cz",
    requestOptions: {
      language: "cs",
      componentRestrictions: { country: "cz" },
    },
    debounce: 300,
  });

  const getTargetPlaceCoordinates = async (locationName: string) => {
    const results = await getGeocode({ address: locationName });
    const { lat, lng } = await getLatLng(results[0]);

    return { lat, lng };
  };

  const handleSelect = async (
    autocompletePrediction: AutocompletePrediction
  ) => {
    setSelected(autocompletePrediction);

    const { lat, lng } = await getTargetPlaceCoordinates(
      autocompletePrediction.description
    );

    onSelect && onSelect(lat, lng);
  };

  return (
    <div className="16 w-72 flex-1">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlass
                className="h-5 w-5 text-main-orange"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Combobox.Input
              className="w-full border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(option: AutocompletePrediction) =>
                option?.structured_formatting?.main_text
              }
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={clearSuggestions}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data?.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nebyla nalezena žádná trasa.
                </div>
              ) : (
                (data ?? []).map((option) => (
                  <Combobox.Option
                    key={option.place_id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-main-yellow text-black" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.description}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
