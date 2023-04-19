import { useRouter } from "next/router";
import { useFieldArray, useFormContext } from "react-hook-form";

import { BikeType, PlaceOfInterest } from "@/domains";
import {
  Button,
  FormInput,
  HorizontalStack,
  LabelContainer,
  VerticalStack,
} from "@/ui";
import { useCreateRoute } from "adapters/routeAdapter";

const defaultValues = {
  name: "",
  description: "",
  bikeTypes: {
    gravel: false,
    mtb: false,
    road: false,
  },
  placesOfInterest: {
    nature: false,
    pub: false,
    swimming: false,
    trail: false,
  },
};

export const EditDetail = ({ prefix = "detail" }) => {
  // const form = useForm<RouteEditFormModel>({
  //   defaultValues,
  // });
  const router = useRouter();

  const { createTodo } = useCreateRoute();

  // const { handleSubmit, getValues, watch, setValue } = form;
  const { handleSubmit, getValues, watch, setValue } = useFormContext();

  const { append, remove, insert } = useFieldArray({
    name: `${prefix}."terrain"`,
  });

  //rename
  const terrains = watch(`${prefix}.terrain`);
  const interestingPlaces = watch(`${prefix}.interestingPlaces`);

  const isTerrainActive = (
    terrain: BikeType
  ): {
    variant: "contained" | "outlined" | "tinted" | "plain" | null | undefined;
  } => {
    const included = terrains?.includes(terrain);

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

  // const onSubmit = (formData: any) => {
  //   console.log("submited", formData);
  // };

  const handleBikeType = (type: BikeType) => {
    const currentType = Boolean(getValues().bikeTypes[type]);

    // setValue(`bikeTypes.${type}`, !currentType);
  };

  const handleInterestType = (type: PlaceOfInterest) => {
    const currentType = Boolean(getValues().placesOfInterest[type]);

    // setValue(`placesOfInterest.${type}`, !currentType);
  };
  return (
    <div className="flex-1 p-12">
      {/* <FormProvider {...form}> */}
      {/* <button type="button" onClick={() => createTodo()}>
        create
      </button> */}
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-12"> */}
      <Button
        variant="contained"
        type="button"
        onClick={() => console.log(getValues(), "vv")}
      >
        show vals
      </Button>
      <VerticalStack className="h-full gap-4">
        <LabelContainer label="Název trasy">
          <FormInput name={`${prefix}.name`} variant="singleBorder" />
        </LabelContainer>
        <LabelContainer label="Popis trasy">
          <FormInput name={`${prefix}.description`} variant="singleBorder" />
        </LabelContainer>
        <HorizontalStack className="justify-between">
          <LabelContainer label="Počet km" className="items-center">
            <p>20</p>
            {/* tohle dostanu z mapy ty hodnoty */}
          </LabelContainer>
          <LabelContainer label="Převýšení (m)" className="items-center">
            <p>250</p>
            {/* tohle dostanu z mapy ty hodnoty */}
          </LabelContainer>
          <LabelContainer label="Vhodné pro">
            <HorizontalStack className="items-end gap-2">
              <Button
                type="button"
                {...isTerrainActive(BikeType.ROAD)}
                // variant={bikeTypes?.road ? "contained" : "outlined"}
                onClick={() => handleTerrainChange(BikeType.ROAD)}
              >
                Silnička
              </Button>
              <Button
                type="button"
                {...isTerrainActive(BikeType.MTB)}
                // variant={bikeTypes?.mtb ? "contained" : "outlined"}
                onClick={() => handleTerrainChange(BikeType.MTB)}
              >
                Horské kolo
              </Button>
              <Button
                type="button"
                {...isTerrainActive(BikeType.GRAVEL)}
                // variant={bikeTypes?.gravel ? "contained" : "outlined"}
                onClick={() => handleTerrainChange(BikeType.GRAVEL)}
              >
                Gravel
              </Button>
            </HorizontalStack>
          </LabelContainer>
        </HorizontalStack>
        <LabelContainer label="Po cestě potkám">
          <HorizontalStack className="items-end gap-2">
            {/* <Button
              type="button"
              variant={placesOfInterest?.swimming ? "contained" : "outlined"}
              onClick={() => handleInterestType(PlaceOfInterest.SWIMMING)}
            >
              Koupání
            </Button>
            <Button
              type="button"
              variant={placesOfInterest?.pub ? "contained" : "outlined"}
              onClick={() => handleInterestType(PlaceOfInterest.PUB)}
            >
              Občerstvení
            </Button>
            <Button
              type="button"
              variant={placesOfInterest?.nature ? "contained" : "outlined"}
              onClick={() => handleInterestType(PlaceOfInterest.NATURE)}
            >
              Hezká příroda
            </Button>
            <Button
              type="button"
              variant={placesOfInterest?.trail ? "contained" : "outlined"}
              onClick={() => handleInterestType(PlaceOfInterest.TRAIL)}
            >
              Trail
            </Button>
            <Button
              type="button"
              variant={placesOfInterest?.culture ? "contained" : "outlined"}
              onClick={() => handleInterestType(PlaceOfInterest.CULTURE)}
            >
              Památky
            </Button> */}
          </HorizontalStack>
        </LabelContainer>
        <Button
          onClick={() => {
            const { locationId, routeId } = router.query;
            router.push(`/locations/${locationId}/${routeId}/edit`);
          }}
          className="mt-auto mr-auto"
        >
          Uložit
        </Button>
      </VerticalStack>
      {/* </form> */}
      {/* </FormProvider> */}
    </div>
  );
};
