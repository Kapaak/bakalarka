import { useRouter } from "next/router";

import { RouteRow } from "@/domains";
import { useLocationPageTable } from "@/hooks";
import {
  Container,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  Table,
} from "@/ui";

interface LocationpageScreenProps {
  locationName?: string;
}

export const LocationPageScreen = ({
  locationName,
}: LocationpageScreenProps) => {
  const { query } = useRouter();

  const { table, isLoading } = useLocationPageTable({
    locationId: String(query.locationId),
  });

  return (
    <section className="relative">
      <MaxWidth>
        <Container height="min-full" className="lg:pt-20">
          <MainHeadline>Destinace v okolí</MainHeadline>
          <MainSubheadline className="mb-10"> {locationName}</MainSubheadline>
          <div className="overflow-x-auto">
            {isLoading && <p>Načítají se trasy ke kraji.</p>}
            <Table<RouteRow>
              headerCells={table?.getHeaderGroups()}
              bodyCells={table?.getRowModel()}
            />
          </div>
        </Container>
      </MaxWidth>
    </section>
  );
};
