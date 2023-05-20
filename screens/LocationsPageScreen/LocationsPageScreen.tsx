import { Container, MainHeadline, MaxWidth } from "@/ui";
import { locations } from "@/utils";

import { LocationCard } from "./components";

export const LocationsPageScreen = () => {
  return (
    <section>
      <MaxWidth>
        <Container height="min-full">
          <MainHeadline>Vyber kraj, který chceš objevovat</MainHeadline>
          <div className="grid grid-flow-row grid-cols-fluid gap-10 pt-10">
            {locations?.map((location) => (
              <LocationCard
                key={location.value}
                label={location.label}
                href={`/locations/${location.value}`}
              />
            ))}
          </div>
        </Container>
      </MaxWidth>
    </section>
  );
};
