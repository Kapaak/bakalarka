import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useRouteContext } from "@/contexts";
import { useGoogleAutocomplete } from "@/hooks";
import { Button, VerticalStack } from "@/ui";

import { RouteInput } from "./RouteInput";

type CrossingPoint = {
  id: string;
};

interface EditRouteProps {
  onReturn?(): void;
}

export const EditRoute = ({ onReturn }: EditRouteProps) => {
  // const [crossingPoints, setCrossingPoints] = useState<CrossingPoint[]>([]);
  const {
    updateStartPoint,
    updateFinishPoint,
    addCrossingPoint,
    crossingPoints,
    removeCrossingPointByIndex,
    translatedPoints,
  } = useRouteContext();

  const form = useForm({
    defaultValues: {
      startPoint: translatedPoints?.startPoint ?? "",
      crossingPoints: translatedPoints?.crossingPoints ?? "",
      finishPoint: translatedPoints?.finishPoint ?? "",
    },
  });
  const { getValues, handleSubmit, reset } = form;

  const { isLoaded } = useGoogleAutocomplete();

  // const handleAddCrossingPointAfter = (index: number) => {
  //   console.log(index, "ind", crossingPoints);

  //   const newCrossingPoints = [...crossingPoints];

  //   newCrossingPoints.splice(index + 1, 0, { id: nanoid() });

  //   setCrossingPoints(newCrossingPoints);
  // };

  // const handleAddBeforeFirst = () => {
  //   const newCrossingPoints = [...crossingPoints];
  //   newCrossingPoints.unshift({ id: nanoid() });

  //   setCrossingPoints(newCrossingPoints);
  // };

  // const handleRemoveCrossingPoint = (id: string, index: number) => {
  //   const filteredPoints = crossingPoints.filter((point) => point.id !== id);

  //   removeCrossingPointByIndex(index);
  //   setCrossingPoints(filteredPoints);
  // };

  useEffect(() => {
    reset({
      startPoint: translatedPoints?.startPoint ?? "",
      crossingPoints: translatedPoints?.crossingPoints ?? "",
      finishPoint: translatedPoints?.finishPoint ?? "",
    });
  }, [
    reset,
    translatedPoints?.crossingPoints,
    translatedPoints?.finishPoint,
    translatedPoints?.startPoint,
  ]);

  return (
    <FormProvider {...form}>
      <div className="flex-1">
        <div>translated:{translatedPoints?.crossingPoints.length}</div>
        <div>crossingPoints:{crossingPoints.length}</div>
        <button onClick={() => console.log(crossingPoints, "kros")}>cr</button>
        {isLoaded && (
          <form
            onSubmit={handleSubmit((val) => console.log(val))}
            className="h-full"
          >
            {/* <button
              onClick={() => console.log(translatedPoints?.startPoint, "star")}
            >
              show strt
            </button>
            <button
              onClick={() =>
                console.log(translatedPoints?.crossingPoints, "star")
              }
            >
              show cross
            </button>
            <button
              type="button"
              onClick={() => console.log(getValues(), "vals")}
            >
              show vals
            </button> */}

            <VerticalStack className="h-full flex-1  gap-4 p-12">
              <RouteInput
                placeholder="Zadejte start"
                onCoordinatesChange={updateStartPoint}
                // onPointAdd={handleAddBeforeFirst}
                name="startPoint"
              />

              {translatedPoints?.crossingPoints?.map((crossingPoint, index) => (
                <RouteInput
                  name={`crossingPoints.${index}`}
                  key={`${crossingPoint}_${index}`}
                  placeholder="Zadejte průjezdový bod"
                  // onPointRemove={() =>
                  //   handleRemoveCrossingPoint(crossingPoint.id, index)
                  // }
                  // onPointAdd={() => handleAddCrossingPointAfter(index)}
                  onCoordinatesChange={(val) => {
                    console.log(val, "vvv");
                    addCrossingPoint(val);
                  }}
                />
              ))}

              <RouteInput
                name="finishPoint"
                placeholder="Zadejte cíl"
                onCoordinatesChange={updateFinishPoint}
              />

              <Button className="mt-auto mr-auto" onClick={onReturn}>
                Zpět do editace popisu
              </Button>
            </VerticalStack>
          </form>
        )}
      </div>
    </FormProvider>
  );
};
