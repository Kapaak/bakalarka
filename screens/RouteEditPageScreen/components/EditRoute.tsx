import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";

import { useRouteContext } from "@/contexts";
import { GeneratedRoute } from "@/domains";
import { useGoogleAutocomplete } from "@/hooks";
import { Button, HorizontalStack, VerticalStack } from "@/ui";

import { RouteInput } from "./RouteInput";

interface EditRouteProps {
  onReturn?(): void;
  onReset(): void;
}

export const EditRoute = ({ onReturn, onReset }: EditRouteProps) => {
  const { routePoints, addPointBeforeLast, updatePointById, removePointById } =
    useRouteContext();

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

  // const form = useForm<RouteModel>({
  //   defaultValues: {
  //     routePoints: routePoints,
  //   },
  // });

  // const { getValues, handleSubmit, reset, control } = form;

  // const { fields } = useFieldArray<RouteModel>({
  //   name: "routePoints",
  //   control,
  // });

  const { fields } = useFieldArray<GeneratedRoute>({
    name: "routePoints",
  });
  //handle submit presun nahoru do onSubmit fce

  const { isLoaded } = useGoogleAutocomplete();

  // useEffect(() => {
  //   reset({
  //     routePoints: routePoints,
  //   });
  // }, [reset, routePoints]);

  return (
    <div>
      <div className="flex-1 overflow-y-scroll">
        {isLoaded && (
          // <form
          //   onSubmit={handleSubmit((val) => console.log(val))}
          //   className="h-full"
          // >
          <div className="h-full">
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

              <HorizontalStack className="mt-auto mr-auto gap-2">
                <Button onClick={onReturn}>Zpět do editace popisu</Button>
                <Button onClick={onReset} variant="outlined">
                  Zpět do editace popisu bez uložení
                </Button>
              </HorizontalStack>
            </VerticalStack>
          </div>
          // </form>
        )}
      </div>
    </div>
  );
};
