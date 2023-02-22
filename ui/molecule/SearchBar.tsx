import { Button, HorizontalStack } from "../atoms";
import { Autocomplete, AutocompleteProps } from "./Autocomplete";

export const SearchBar = ({ options }: AutocompleteProps) => {
  //todo tady by to asi mohl byt form a nebo neco, abych ty data vytahl a poslal
  // ale ten form asi ani netreba
  return (
    <HorizontalStack className="gap-3">
      <Autocomplete options={options} />
      <Button color="secondary">Najít</Button>
    </HorizontalStack>
  );
};
