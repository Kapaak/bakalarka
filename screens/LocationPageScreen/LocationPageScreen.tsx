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
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth>
        <Container height="full" className="pt-20">
          <HorizontalStack>
            <div className="flex-1">
              <MainHeadline>Oblíbené destinace ve vašem okolí</MainHeadline>
              <MainSubheadline>Olomouc</MainSubheadline>
            </div>
            <HorizontalStack className="flex-1 basis-1/3 gap-10 overflow-x-scroll border border-red-500">
              <LocationCard title="Okolo potoka" href={"/okolo-potoka"} />
              <LocationCard title="Okolo potoka" href={"/okolo-potoka"} />
              <LocationCard title="Okolo potoka" href={"/okolo-potoka"} />
              <LocationCard title="Okolo potoka" href={"/okolo-potoka"} />
            </HorizontalStack>
          </HorizontalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
