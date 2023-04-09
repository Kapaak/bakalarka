import {
  Container,
  HorizontalStack,
  VerticalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  SearchBar,
} from "@/ui";
import Image from "next/image";

import CyclistHeroImage from "../../public/images/hero-img.jpg";
import { useMemo } from "react";

export const HomePageScreen = () => {
  const searchOptions = useMemo(
    () => [
      { value: "olomoucky-kraj", label: "Olomoucký kraj" },
      { value: "jihomoravsky-kraj", label: "Jihomoravský kraj" },
      { value: "moravskoslezsky-kraj", label: "Moravskoslezský kraj" },
      { value: "zlinsky-kraj", label: "Zlínský kraj" },
      { value: "vysocina-kraj", label: "Kraj Vysočina" },
      { value: "pardubicky-kraj", label: "Pardubický kraj" },
      { value: "kralovehradecky-kraj", label: "Královehradecký kraj" },
      { value: "liberecky-kraj", label: "Liberecký kraj" },
      { value: "ustecky-kraj", label: "Ústecký kraj" },
      { value: "karlovarsky-kraj", label: "Karlovarský kraj" },
      { value: "plzensky-kraj", label: "Plzeňský kraj" },
      { value: "jihocesky-kraj", label: "Jihočeský kraj" },
      { value: "stredocesky-kraj", label: "Středočeský kraj" },
    ],
    []
  );
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
              <SearchBar
                placeholder="Vyhledej kraj mé trasy..."
                baseRoute="/locations"
                options={searchOptions}
              />
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
    </section>
  );
};
