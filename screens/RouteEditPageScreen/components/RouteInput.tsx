import { HorizontalStack, GoogleAutocomplete, IconButton } from "@/ui";
import { MinusCircle, PlusCircle } from "phosphor-react";

interface RouteInputProps {
  placeholder: string;
  onPointAdd?(): void;
  onPointRemove?(): void;
}

export const RouteInput = ({
  placeholder,
  onPointAdd,
  onPointRemove,
}: RouteInputProps) => {
  return (
    <HorizontalStack className="max-w-3xl rounded-md bg-white">
      <GoogleAutocomplete placeholder={placeholder} />

      {onPointRemove && (
        <IconButton
          icon={
            <MinusCircle size={30} weight="fill" className="text-main-orange" />
          }
          className=" p-2"
          onClick={onPointRemove}
        />
      )}

      {onPointAdd && (
        <IconButton
          icon={
            <PlusCircle size={30} weight="fill" className="text-main-orange" />
          }
          className="pl-2 pr-4"
          onClick={onPointAdd}
        />
      )}
    </HorizontalStack>
  );
};
