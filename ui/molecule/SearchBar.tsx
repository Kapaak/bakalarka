import { AutocompleteOption } from "@/domains";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, HorizontalStack } from "../atoms";
import { Autocomplete } from "./Autocomplete";

interface SearchBarProps {
  options: AutocompleteOption[];
  placeholder?: string;
}

export const SearchBar = ({ options, placeholder }: SearchBarProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <HorizontalStack className="gap-3 rounded-md bg-white px-4 py-2 shadow-md ">
      <Autocomplete
        placeholder={placeholder}
        options={options}
        onSelect={handleLocationSelect}
      />
      <Button
        color="secondary"
        onClick={() => router.push(`/locations/${selectedLocation}`)}
      >
        Najít
      </Button>
    </HorizontalStack>
  );
};
