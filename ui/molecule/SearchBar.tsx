import { AutocompleteOption } from "@/domains";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, HorizontalStack } from "../atoms";
import { Autocomplete } from "./Autocomplete";

interface SearchBarProps {
  options: AutocompleteOption[];
}

export const SearchBar = ({ options }: SearchBarProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <HorizontalStack className="max-w-lg gap-3 rounded-md px-4 py-2 shadow-md">
      <Autocomplete options={options} onSelect={handleLocationSelect} />
      <Button
        color="secondary"
        onClick={() => router.push(`/locations/${selectedLocation}`)}
      >
        Najít
      </Button>
    </HorizontalStack>
  );
};
