import { BaseSyntheticEvent, RefObject, forwardRef } from "react";
import { Popup } from "react-leaflet";

import { LatLngLiteral } from "@/domains";
import { Button, Text, VerticalStack } from "@/ui";
import L from "leaflet";

interface RemovePopupProps {
  position: LatLngLiteral;
  onSubmit(): void;
  ref: RefObject<L.Popup>;
}

export const RemovePopup = forwardRef<L.Popup, RemovePopupProps>(
  ({ position, onSubmit }, ref) => {
    const handleTap = (e: BaseSyntheticEvent) => {
      //aby pri kliknu uvnitr tohodle popupu neprosel klik i na mapu
      e.stopPropagation();

      onSubmit();
    };

    return (
      <Popup position={[position?.lat, position?.lng]} ref={ref}>
        <VerticalStack>
          <Text className="text-[1.4rem]">Odstranit bod</Text>
          <Button size="small" color="error" onClick={handleTap}>
            potvrdit
          </Button>
        </VerticalStack>
      </Popup>
    );
  }
);

RemovePopup.displayName = "RemovePopup";
