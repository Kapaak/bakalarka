import {
  Button,
  Container,
  HorizontalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  VerticalStack,
} from "@/ui";
import { LocationCard } from "./components";

interface LocationpageScreenProps {
  locationName?: string;
  locationValue?: string;
}

export const LocationPageScreen = ({
  locationName,
  locationValue,
}: LocationpageScreenProps) => {
  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth className="max-w-[60rem] lg:max-w-screen-2xl">
        <Container height="min-full" className="lg:pt-20">
          <VerticalStack className="lg:flex-row">
            <VerticalStack className="flex-1 gap-4">
              <MainHeadline>Oblíbené destinace ve vašem okolí</MainHeadline>
              <HorizontalStack className="items-center justify-between">
                <MainSubheadline>{locationName}</MainSubheadline>
              </HorizontalStack>
              <Button color="secondary" className="mb-4 lg:hidden">
                Upřesnit výběr
              </Button>
            </VerticalStack>
            <VerticalStack className="flex-1 basis-1/3 gap-4 overflow-x-scroll lg:flex-row">
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
            </VerticalStack>
          </VerticalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
