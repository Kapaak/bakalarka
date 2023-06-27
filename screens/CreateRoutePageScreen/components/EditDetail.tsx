import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

import { BikeType, PlaceOfInterest } from "@/domains";
import {
  Button,
  ButtonProps,
  ControlledSelect,
  FormInput,
  HorizontalStack,
  LabelContainer,
  VerticalStack,
} from "@/ui";
import { locations } from "@/utils";
import { useRouteContext } from "contexts/RouteContext";

interface EditDetailProps {
  prefix?: string;
}

export const EditDetail = ({ prefix = "detail" }: EditDetailProps) => {
  const { query, ...router } = useRouter();

  const { watch, setValue } = useFormContext();

  const { distance } = useRouteContext();

  //rename
  const terrains = watch(`${prefix}.terrain`);
  const interestingPlaces = watch(`${prefix}.interestingPlaces`);

  const isTerrainActive = (terrain: BikeType): ButtonProps => {
    const included = terrains?.includes(terrain);

    if (included)
      return {
        variant: "contained",
      };

    return {
      variant: "outlined",
    };
  };

  const isInterestingPlaceActive = (
    interestingPlace: PlaceOfInterest
  ): ButtonProps => {
    const included = interestingPlaces?.includes(interestingPlace);

    if (included)
      return {
        variant: "contained",
      };

    return {
      variant: "outlined",
    };
  };

  const handleTerrainChange = (terrain: BikeType) => {
    const newTerrains: string[] = structuredClone(terrains);

    const index = Array.from(terrains)?.findIndex((t) => t === terrain);

    if (index > -1) {
      newTerrains.splice(index, 1);

      return setValue(`${prefix}.terrain`, newTerrains);
    }

    setValue(`${prefix}.terrain`, [...newTerrains, terrain]);
  };

  const handleInterestingPlaceChange = (interestingPlace: PlaceOfInterest) => {
    const newInterestingPlaces: string[] = structuredClone(interestingPlaces);

    const index = Array.from(interestingPlaces)?.findIndex(
      (t) => t === interestingPlace
    );

    if (index > -1) {
      newInterestingPlaces.splice(index, 1);

      return setValue(`${prefix}.interestingPlaces`, newInterestingPlaces);
    }

    setValue(`${prefix}.interestingPlaces`, [
      ...newInterestingPlaces,
      interestingPlace,
    ]);
  };

  return (
    <div className="flex-1 p-12">
      <VerticalStack className="h-full gap-4">
        <LabelContainer label="Název trasy">
          <FormInput name={`${prefix}.name`} variant="singleBorder" required />
        </LabelContainer>
        <LabelContainer label="Popis trasy">
          <FormInput
            name={`${prefix}.description`}
            variant="singleBorder"
            required
          />
        </LabelContainer>
        <HorizontalStack className="justify-between">
          <LabelContainer label="Počet km" className="items-center">
            <p>{distance}</p>
          </LabelContainer>
          <LabelContainer label="Převýšení (m)" className="items-center">
            <p>-</p>
          </LabelContainer>
          <LabelContainer label="Vhodné pro">
            <HorizontalStack className="items-end gap-2">
              <Button
                type="button"
                {...isTerrainActive(BikeType.ROAD)}
                onClick={() => handleTerrainChange(BikeType.ROAD)}
              >
                Silnička
              </Button>
              <Button
                type="button"
                {...isTerrainActive(BikeType.MTB)}
                onClick={() => handleTerrainChange(BikeType.MTB)}
              >
                Horské kolo
              </Button>
              <Button
                type="button"
                {...isTerrainActive(BikeType.GRAVEL)}
                onClick={() => handleTerrainChange(BikeType.GRAVEL)}
              >
                Gravel
              </Button>
            </HorizontalStack>
          </LabelContainer>
        </HorizontalStack>
        <LabelContainer label="Informace o trase">
          <HorizontalStack className="items-end gap-2">
            <Button
              type="button"
              {...isInterestingPlaceActive(PlaceOfInterest.SWIMMING)}
              onClick={() =>
                handleInterestingPlaceChange(PlaceOfInterest.SWIMMING)
              }
            >
              Koupání
            </Button>
            <Button
              type="button"
              {...isInterestingPlaceActive(PlaceOfInterest.PUB)}
              onClick={() => handleInterestingPlaceChange(PlaceOfInterest.PUB)}
            >
              Občerstvení
            </Button>
            <Button
              type="button"
              {...isInterestingPlaceActive(PlaceOfInterest.NATURE)}
              onClick={() =>
                handleInterestingPlaceChange(PlaceOfInterest.NATURE)
              }
            >
              Hezká příroda
            </Button>
            <Button
              type="button"
              {...isInterestingPlaceActive(PlaceOfInterest.CHILDREN)}
              onClick={() =>
                handleInterestingPlaceChange(PlaceOfInterest.CHILDREN)
              }
            >
              Vhodné pro děti
            </Button>
            <Button
              type="button"
              {...isInterestingPlaceActive(PlaceOfInterest.CULTURE)}
              onClick={() =>
                handleInterestingPlaceChange(PlaceOfInterest.CULTURE)
              }
            >
              Památky
            </Button>
          </HorizontalStack>
        </LabelContainer>

        <ControlledSelect
          name={`${prefix}.regions`}
          options={locations}
          required
        />

        <Button className="mt-auto mr-auto">Uložit</Button>
      </VerticalStack>
    </div>
  );
};
