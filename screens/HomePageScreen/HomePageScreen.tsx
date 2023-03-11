import {
  Container,
  HorizontalStack,
  VerticalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  GoogleComboBox,
} from "@/ui";
import Image from "next/image";

import CyclistHeroImage from "../../public/images/hero-img.jpg";
import { useRouter } from "next/router";

export const HomePageScreen = () => {
  const router = useRouter();

  const handleFindSelected = (locationName: string) => {
    router.push(`/locations/${locationName}`);
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
              <GoogleComboBox
                label="Najít"
                placeholder="Vyhledejte místo své trasy"
                onSelect={(locationName) => handleFindSelected(locationName)}
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
