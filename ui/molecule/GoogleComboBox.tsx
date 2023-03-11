import { ClassName } from "@/domains";
import { useGoogleAutocomplete } from "hooks/useGoogleAutocomplete";
import { useState } from "react";
import { Button, VerticalStack } from "../atoms";
import { GoogleAutocomplete } from "./GoogleAutocomplete";

interface GoogleComboBoxProps {
  onSelect(locationName: string): void;
  label: string;
  placeholder: string;
  className?: ClassName;
}

export const GoogleComboBox = ({
  onSelect,
  label,
  placeholder,
  className = "",
}: GoogleComboBoxProps) => {
  const [selected, setSelected] = useState("");

  const { isLoaded } = useGoogleAutocomplete();

  const handleClick = () => {
    selected.length > 0 && onSelect(selected);
  };
  return (
    <VerticalStack
      className={`mb-10 gap-2 rounded-md lg:flex-row lg:items-center lg:bg-white lg:px-2 lg:py-1 lg:shadow-regular ${className}`}
    >
      {isLoaded && (
        <>
          <GoogleAutocomplete
            onSelect={(val) => setSelected(val.name.toLocaleLowerCase())}
            placeholder={placeholder}
          />
          <Button
            className="py-4 lg:border-main-orange lg:bg-main-orange lg:text-black"
            onClick={handleClick}
          >
            {label}
          </Button>
        </>
      )}
    </VerticalStack>
  );
};
