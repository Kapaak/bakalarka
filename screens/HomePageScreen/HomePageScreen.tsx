import React, { useMemo, useState } from "react";
import {
  Button,
  Container,
  GoogleAutocomplete,
  HorizontalStack,
  VerticalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  SearchBar,
} from "@/ui";
import Image from "next/image";

import CyclistHeroImage from "../../public/images/hero-img.jpg";
import { useRouter } from "next/router";
import { useGoogleAutocomplete } from "@/hooks";

export const HomePageScreen = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const router = useRouter();
  const { isLoaded } = useGoogleAutocomplete();

  const handleFindSelected = () => {
    selectedCity.length > 0 && router.push(`/locations/${selectedCity}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange ">
      <MaxWidth>
        <Container height="full">
          <HorizontalStack className="h-full justify-end gap-4 lg:justify-between">
            <VerticalStack className="mb-5 flex-1 justify-end gap-4 lg:justify-center">
              <div>
                <MainHeadline className="max-w-lg font-bold">
                  Cestujte a objevujte nové kouty
                </MainHeadline>
                <MainSubheadline className="font-bold">
                  ze sedla svého kola
                </MainSubheadline>
              </div>

              <VerticalStack className="mb-10 gap-2 rounded-md lg:flex-row lg:items-center lg:bg-white lg:px-2 lg:py-1 lg:shadow-regular">
                {isLoaded && (
                  <GoogleAutocomplete
                    onSelect={(val) =>
                      setSelectedCity(val.name.toLocaleLowerCase())
                    }
                    placeholder="Vyhledejte místo své trasy"
                  />
                )}
                <Button
                  className="py-4 lg:border-main-orange lg:bg-main-orange lg:text-black"
                  onClick={handleFindSelected}
                >
                  Najít
                </Button>
              </VerticalStack>
            </VerticalStack>
            <div className="relative z-20 hidden flex-1 lg:block">
              <Image
                src={CyclistHeroImage}
                alt="Cyklista sprintující na kole"
                fill
                className="z-0 m-auto max-h-[70rem] max-w-full object-cover object-center pl-[20%] md:object-right"
              />
            </div>
          </HorizontalStack>
        </Container>
      </MaxWidth>
      {/* <div className="absolute bottom-0 z-10 h-1/4 w-full bg-white pt-8">
        <MaxWidth>
          <SearchBar
            options={[
              { id: "1", label: "Brno", value: "brno" },
              { id: "2", label: "Olomouc", value: "olomouc" },
            ]}
          />
        </MaxWidth>
      </div> */}
    </section>
  );
};
