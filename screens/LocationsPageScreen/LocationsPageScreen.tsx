import { Region } from "@/domains";
import { Container, MainHeadline, MaxWidth } from "@/ui";
import { locations } from "@/utils";

import { LocationCard } from "./components";

interface LocationsPageScreenProps {
  regionsRoutesCount: Region;
}

export const LocationsPageScreen = ({
  regionsRoutesCount,
}: LocationsPageScreenProps) => {
  return (
    <section>
      <MaxWidth>
        <Container height="min-full">
          <MainHeadline>Vyber kraj, který chceš objevovat</MainHeadline>
          <div className="grid grid-flow-row grid-cols-fluid gap-10 pt-10">
            {locations?.map((location) => {
              const region = location.value;
              return (
                <LocationCard
                  key={location.value}
                  routesCount={regionsRoutesCount[region] ?? 0}
                  label={location.label}
                  href={`/locations/${location.value}`}
                />
              );
            })}
          </div>
        </Container>
      </MaxWidth>
    </section>
  );
};
