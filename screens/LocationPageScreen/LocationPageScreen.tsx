import {
  Container,
  HorizontalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
} from "@/ui";
import { LocationCard } from "./LocationCard";

export const LocationPageScreen = () => {
  return (
    <section className="relative bg-main-yellow">
      <MaxWidth>
        <Container fullHeight>
          <HorizontalStack>
            <div>
              <MainHeadline>Oblíbené destinace ve vašem okolí</MainHeadline>
              <MainSubheadline>Olomouc</MainSubheadline>
            </div>
            <HorizontalStack className="gap-10">
              <LocationCard title="Okolo potoka" />
              <LocationCard title="Okolo potoka" />
              <LocationCard title="Okolo potoka" />
              <LocationCard title="Okolo potoka" />
            </HorizontalStack>
          </HorizontalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
