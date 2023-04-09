import { Container, MainHeadline, MainSubheadline, MaxWidth } from "@/ui";
import { FavoriteLocations, LocationCard } from "./components";

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
          <MainHeadline>Destinace v okolí</MainHeadline>
          <MainSubheadline> {locationName}</MainSubheadline>
          {/* <FavoriteLocations locationName={locationName} /> */}
        </Container>
      </MaxWidth>
    </section>
  );
};
