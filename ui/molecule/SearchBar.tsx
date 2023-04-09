import NextLink from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";

import { AutocompleteOption } from "@/domains";

import { Button, HorizontalStack } from "../atoms";
// eslint-disable-next-line import/order
import { Autocomplete } from "./Autocomplete";

interface SearchBarProps {
  options: AutocompleteOption[];
  placeholder?: string;
  baseRoute?: string;
}

export const SearchBar = ({
  options,
  placeholder,
  baseRoute = "/",
}: SearchBarProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  const isValidLocation = selectedLocation.length > 0;

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    isValidLocation && router.push(`${baseRoute}/${selectedLocation}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HorizontalStack className="gap-3 rounded-md bg-white px-4 py-2 shadow-regular ">
        <Autocomplete
          placeholder={placeholder}
          options={options}
          onSelect={handleLocationSelect}
        />
        <NextLink
          href={isValidLocation ? `${baseRoute}/${selectedLocation}` : "/"}
        >
          <Button color="secondary">Najít</Button>
        </NextLink>
      </HorizontalStack>
    </form>
  );
};
