import { BikeType, PlaceOfInterest, RouteEditFormModel } from "@/domains";
import {
  Button,
  TransparentCard,
  VerticalStack,
  HorizontalStack,
  FormInput,
  LabelContainer,
} from "@/ui";
import { MapContainer } from "@/components";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

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

export const RouteEditPageScreen = () => {
  const form = useForm<RouteEditFormModel>({
    defaultValues,
  });
  const router = useRouter();

  const { handleSubmit, getValues, watch, setValue } = form;

  const bikeTypes = watch("bikeTypes");
  const placesOfInterest = watch("placesOfInterest");

  const onSubmit = (formData: any) => {
    console.log("submited", formData);
  };

  const handleBikeType = (type: BikeType) => {
    const currentType = Boolean(getValues().bikeTypes[type]);

    setValue(`bikeTypes.${type}`, !currentType);
  };

  const handleInterestType = (type: PlaceOfInterest) => {
    const currentType = Boolean(getValues().placesOfInterest[type]);

    setValue(`placesOfInterest.${type}`, !currentType);
  };

  return (
    <FormProvider {...form}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TransparentCard>
          <VerticalStack className="flex-1 gap-4 p-12">
            <LabelContainer label="Název trasy">
              <FormInput name="name" variant="singleBorder" />
            </LabelContainer>
            <LabelContainer label="Popis trasy">
              <FormInput name="description" variant="singleBorder" />
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
                    variant={bikeTypes.road ? "contained" : "outlined"}
                    onClick={() => handleBikeType(BikeType.ROAD)}
                  >
                    Silnička
                  </Button>
                  <Button
                    type="button"
                    variant={bikeTypes.mtb ? "contained" : "outlined"}
                    onClick={() => handleBikeType(BikeType.MTB)}
                  >
                    Horské kolo
                  </Button>
                  <Button
                    type="button"
                    variant={bikeTypes.gravel ? "contained" : "outlined"}
                    onClick={() => handleBikeType(BikeType.GRAVEL)}
                  >
                    Gravel
                  </Button>
                </HorizontalStack>
              </LabelContainer>
            </HorizontalStack>
            <LabelContainer label="Po cestě potkám">
              <HorizontalStack className="items-end gap-2">
                <Button
                  type="button"
                  variant={placesOfInterest.swimming ? "contained" : "outlined"}
                  onClick={() => handleInterestType(PlaceOfInterest.SWIMMING)}
                >
                  Koupání
                </Button>
                <Button
                  type="button"
                  variant={placesOfInterest.pub ? "contained" : "outlined"}
                  onClick={() => handleInterestType(PlaceOfInterest.PUB)}
                >
                  Hospoda
                </Button>
                <Button
                  type="button"
                  variant={placesOfInterest.nature ? "contained" : "outlined"}
                  onClick={() => handleInterestType(PlaceOfInterest.NATURE)}
                >
                  Hezká příroda
                </Button>
                <Button
                  type="button"
                  variant={placesOfInterest.trail ? "contained" : "outlined"}
                  onClick={() => handleInterestType(PlaceOfInterest.TRAIL)}
                >
                  Trail
                </Button>
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

          <div className="flex-1 border border-red-500 p-4">
            <MapContainer />
          </div>
        </TransparentCard>
      </form>
    </FormProvider>
  );
};
