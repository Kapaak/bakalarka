import { useEffect, useMemo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { useRouteContext } from "@/contexts";
import { RouteModel } from "@/domains";
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
    routePoints,
    crossingPoints,
    addPointBeforeLast,
    removeCrossingPointByIndex,
    updatePointById,
    translatedPoints,
  } = useRouteContext();

  const routePointsValues = useMemo(
    () => routePoints.map((routePoint) => routePoint?.value ?? ""),
    [routePoints]
  );

  const isNotLastRoute = (index: number) => ({
    ...(index !== routePoints.length - 1
      ? { onPointAdd: () => addPointBeforeLast() }
      : {}),
  });

  const form = useForm<RouteModel>({
    defaultValues: {
      routePoints: routePoints,
    },
  });

  const { getValues, handleSubmit, reset, control } = form;

  const { fields } = useFieldArray<RouteModel>({
    name: "routePoints",
    control,
  });

  // const form = useForm({
  //   defaultValues: {
  //     startPoint: translatedPoints?.startPoint ?? "",
  //     crossingPoints: translatedPoints?.crossingPoints ?? "",
  //     finishPoint: translatedPoints?.finishPoint ?? "",
  //   },
  // });

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
      routePoints: routePoints,
    });
  }, [reset, routePoints]);

  return (
    <FormProvider {...form}>
      <div className="flex-1">
        <div>translated:{translatedPoints?.crossingPoints.length}</div>
        <div>crossingPoints:{crossingPoints.length}</div>
        <button onClick={() => console.log(getValues(), "kros")}>valus</button>
        <br />
        <button onClick={() => console.log(routePoints, "vals")}>getAll</button>
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
              {/* <RouteInput
                placeholder="Zadejte start"
                onCoordinatesChange={updateStartPoint}
                // onPointAdd={handleAddBeforeFirst}
                name="startPoint"
              /> */}

              {fields.map((field, index) => (
                <RouteInput
                  key={field.id}
                  name={`routePoints.${index}.value`}
                  placeholder="Zadejte bod"
                  {...isNotLastRoute(index)}
                  onCoordinatesChange={(val) => {
                    updatePointById(routePoints[index].id, val);
                    // addCrossingPoint(val);
                  }}
                />
              ))}
              {/* {routePointsValues?.map((routePoint, index) => (
                <RouteInput
                  name={`routePoints.${routePoints[index].id}`}
                  key={`${routePoint}_${routePoints[index].id}`}
                  placeholder="Zadejte průjezdový bod"
                  // onPointRemove={() =>
                  //   handleRemoveCrossingPoint(crossingPoint.id, index)
                  // }
                  // onPointAdd={() => handleAddCrossingPointAfter(index)}
                  // onPointAdd={() => addPointBeforeLast()}

                  {...isNotLastRoute(index)}
                  onCoordinatesChange={(val) => {
                    updatePointById(routePoints[index].id, val);
                    // addCrossingPoint(val);
                  }}
                />
              ))} */}

              {/* <RouteInput
                name="finishPoint"
                placeholder="Zadejte cíl"
                onCoordinatesChange={updateFinishPoint}
              /> */}

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
