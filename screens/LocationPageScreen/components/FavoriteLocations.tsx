import {
  HorizontalStack,
  MainHeadline,
  MainSubheadline,
  VerticalStack,
} from "@/ui";

import { LocationCard } from "./LocationCard";

interface FavoriteLocationsProps {
  locationName?: string;
}

export const FavoriteLocations = ({ locationName }: FavoriteLocationsProps) => {
  return (
    <VerticalStack className="lg:flex-row">
      <VerticalStack className="flex-1 gap-4">
        <MainHeadline>Oblíbené destinace ve vašem okolí</MainHeadline>
        <HorizontalStack className="items-center justify-between">
          <MainSubheadline>{locationName}</MainSubheadline>
        </HorizontalStack>
      </VerticalStack>
      <div className="grid-col-fluid grid">
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
      </div>
    </VerticalStack>
  );
};
