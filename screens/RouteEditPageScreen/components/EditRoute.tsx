import { Button, VerticalStack } from "@/ui";
import { useState } from "react";
import { nanoid } from "nanoid";
import { RouteInput } from "./RouteInput";
import { useRouteContext } from "@/contexts";
import { useGoogleAutocomplete } from "@/hooks";

type CrossingPoint = {
  id: string;
};

interface EditRouteProps {
  onReturn?(): void;
}

export const EditRoute = ({ onReturn }: EditRouteProps) => {
  const [crossingPoints, setCrossingPoints] = useState<CrossingPoint[]>([]);
  const {
    updateStartPoint,
    updateFinishPoint,
    addCrossingPoint,
    removeCrossingPointByIndex,
  } = useRouteContext();

  const { isLoaded } = useGoogleAutocomplete();

  const handleAddCrossingPointAfter = (index: number) => {
    console.log(index, "ind", crossingPoints);

    const newCrossingPoints = [...crossingPoints];

    newCrossingPoints.splice(index + 1, 0, { id: nanoid() });

    setCrossingPoints(newCrossingPoints);
  };

  const handleAddBeforeFirst = () => {
    const newCrossingPoints = [...crossingPoints];
    newCrossingPoints.unshift({ id: nanoid() });

    setCrossingPoints(newCrossingPoints);
  };

  const handleRemoveCrossingPoint = (id: string, index: number) => {
    const filteredPoints = crossingPoints.filter((point) => point.id !== id);

    removeCrossingPointByIndex(index);
    setCrossingPoints(filteredPoints);
  };

  return (
    <VerticalStack className="h-full flex-1  gap-4 p-12">
      {isLoaded && (
        <>
          <RouteInput
            placeholder="Zadejte start"
            onSelect={updateStartPoint}
            onPointAdd={handleAddBeforeFirst}
          />
          {crossingPoints?.map((crossingPoint, index) => (
            <RouteInput
              key={crossingPoint.id}
              placeholder="Zadejte průjezdový bod"
              onPointRemove={() =>
                handleRemoveCrossingPoint(crossingPoint.id, index)
              }
              onPointAdd={() => handleAddCrossingPointAfter(index)}
              onSelect={(val) => {
                console.log(val, "vvv");
                addCrossingPoint(val);
              }}
            />
          ))}
          <RouteInput placeholder="Zadejte cíl" onSelect={updateFinishPoint} />
        </>
      )}

      <Button className="mt-auto mr-auto" onClick={onReturn}>
        Zpět do editace popisu
      </Button>
    </VerticalStack>
  );
};
