import { useCallback, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { useRouteContext } from "@/contexts";
import { RouteModel } from "@/domains";
import { useGoogleAutocomplete } from "@/hooks";
import { Button, VerticalStack } from "@/ui";

import { RouteInput } from "./RouteInput";

interface EditRouteProps {
  onReturn?(): void;
}

export const EditRoute = ({ onReturn }: EditRouteProps) => {
  const {
    routePoints,
    crossingPoints,
    addPointBeforeLast,
    updatePointById,
    removePointById,
    translatedPoints,
  } = useRouteContext();

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

  const { isLoaded } = useGoogleAutocomplete();

  useEffect(() => {
    reset({
      routePoints: routePoints,
    });
  }, [reset, routePoints]);

  return (
    <FormProvider {...form}>
      <div className="flex-1 overflow-y-scroll">
        {isLoaded && (
          <form
            onSubmit={handleSubmit((val) => console.log(val))}
            className="h-full"
          >
            <VerticalStack className="h-full flex-1  gap-4 p-12">
              {fields.map((field, index) => (
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
