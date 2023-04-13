import { BaseSyntheticEvent, RefObject, forwardRef } from "react";
import { Popup } from "react-leaflet";

import { LatLngLiteral } from "@/domains";
import { Button, Text, VerticalStack } from "@/ui";
import L from "leaflet";

interface TapPopupProps {
  position: LatLngLiteral;
  onTap(): void;
  ref: RefObject<L.Popup>;
}

export const TapPopup = forwardRef<L.Popup, TapPopupProps>(
  ({ position, onTap }, ref) => {
    const handleTap = (e: BaseSyntheticEvent) => {
      // e.stopPropagation();

      onTap();
    };

    return (
      <Popup
        eventHandlers={{ click: () => console.log("xx") }}
        position={[position?.lat, position?.lng]}
        ref={ref}
      >
        <VerticalStack>
          <Text className="text-[1.4rem]">Vytvořit nový bod zde</Text>
          <Button size="small" onClick={handleTap}>
            potvrdit
          </Button>
        </VerticalStack>
      </Popup>
    );
  }
);

TapPopup.displayName = "TapPopup";
