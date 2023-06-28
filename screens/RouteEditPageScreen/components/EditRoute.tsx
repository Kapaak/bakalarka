import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useRouteContext } from "@/contexts";
import { useGoogleAutocomplete } from "@/hooks";
import { Button, HorizontalStack, VerticalStack } from "@/ui";

import { RouteInput } from "./RouteInput";

interface EditRouteProps {
  onReturn?(): void;
  onReset(): void;
}

export const EditRoute = ({ onReturn, onReset }: EditRouteProps) => {
  const {
    routePoints,
    addPointBeforeLast,
    updatePointById,
    removePointById,
    allowAddCrossingPts,
    toggleAddCrossingPts,
  } = useRouteContext();

  const { isLoaded } = useGoogleAutocomplete();

  const events = useCallback(
    (index: number) => ({
      ...(index < routePoints.length - 1 && index > 0
        ? {
            onPointAdd: () => addPointBeforeLast(),
            onPointRemove: () => removePointById(routePoints[index].id),
          }
        : index === 0
        ? { onPointAdd: () => addPointBeforeLast() }
        : {}),
    }),
    [addPointBeforeLast, removePointById, routePoints]
  );
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("routePoints", routePoints);
  }, [routePoints, setValue]);

  return (
    <div className="flex-1">
      <div className="h-full overflow-y-scroll">
        {isLoaded && (
          <div className="h-full ">
            <VerticalStack className="h-full flex-1  gap-4 p-12">
              {routePoints?.map((field, index) => (
                <RouteInput
                  key={field.id}
                  name={`routePoints.${index}.value`}
                  placeholder="Zadejte bod"
                  {...events(index)}
                  onCoordinatesChange={(val) =>
                    updatePointById(routePoints[index].id, val)
                  }
                />
              ))}

              <Button
                className="mr-auto"
                variant={allowAddCrossingPts ? "contained" : "outlined"}
                onClick={toggleAddCrossingPts}
                type="button"
              >
                Přidat průnikový bod
              </Button>

              <HorizontalStack className="mt-auto mr-auto gap-2">
                <Button onClick={onReturn}>Zpět do editace popisu</Button>
                {/* <Button onClick={onReset} variant="outlined">
                  Zpět do editace popisu bez uložení
                </Button> */}
              </HorizontalStack>
            </VerticalStack>
          </div>
        )}
      </div>
    </div>
  );
};
