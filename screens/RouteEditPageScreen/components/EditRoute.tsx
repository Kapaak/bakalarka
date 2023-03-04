import { Button, VerticalStack } from "@/ui";
import { useState } from "react";
import { nanoid } from "nanoid";
import { RouteInput } from "./RouteInput";

type CrossingPoint = {
  id: string;
};

interface EditRouteProps {
  onReturn?(): void;
}

export const EditRoute = ({ onReturn }: EditRouteProps) => {
  const [crossingPoints, setCrossingPoints] = useState<CrossingPoint[]>([]);

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

  const handleRemoveCrossingPoint = (id: string) => {
    const filteredPoints = crossingPoints.filter((point) => point.id !== id);
    setCrossingPoints(filteredPoints);
  };

  return (
    <VerticalStack className="h-full flex-1  gap-4 p-12">
      <RouteInput
        placeholder="Zadejte start"
        onPointAdd={handleAddBeforeFirst}
      />
      {crossingPoints?.map((crossingPoint, index) => (
        <RouteInput
          key={crossingPoint.id}
          placeholder="Zadejte průjezdový bod"
          onPointRemove={() => handleRemoveCrossingPoint(crossingPoint.id)}
          onPointAdd={() => handleAddCrossingPointAfter(index)}
        />
      ))}
      <RouteInput placeholder="Zadejte cíl" />

      <Button className="mt-auto mr-auto" onClick={onReturn}>
        Zpět do editace popisu
      </Button>
    </VerticalStack>
  );
};
