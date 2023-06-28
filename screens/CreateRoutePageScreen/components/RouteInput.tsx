import { Controller } from "react-hook-form";

import { LatLngLiteral } from "@/domains";
import { GoogleAutocomplete, HorizontalStack, IconButton } from "@/ui";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";

interface RouteInputProps {
  placeholder: string;
  onPointAdd?(): void;
  onPointRemove?(): void;
  onCoordinatesChange?(coordinates: LatLngLiteral): void;
  name: string;
}

export const RouteInput = ({
  placeholder,
  onPointAdd,
  onPointRemove,
  onCoordinatesChange,
  name,
}: RouteInputProps) => {
  return (
    <HorizontalStack className="max-w-3xl rounded-md border bg-white shadow-regular">
      <Controller
        name={name}
        render={({ field, fieldState }) => (
          <GoogleAutocomplete
            name={field.name}
            inputRef={field.ref}
            value={field?.value ?? undefined}
            onChange={field.onChange}
            onCoordinatesChange={onCoordinatesChange}
            placeholder={placeholder}
          />
        )}
      />

      {onPointRemove && (
        <IconButton
          icon={
            <MinusCircle size={30} weight="fill" className="text-main-orange" />
          }
          className=" p-2"
          onClick={onPointRemove}
          type="button"
        />
      )}

      {onPointAdd && (
        <IconButton
          icon={
            <PlusCircle size={30} weight="fill" className="text-main-orange" />
          }
          className="pl-2 pr-4"
          type="button"
          onClick={onPointAdd}
        />
      )}
    </HorizontalStack>
  );
};
