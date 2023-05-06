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
  locationValue?: string;
}

export const LocationPageScreen = ({
  locationName,
  locationValue,
}: LocationpageScreenProps) => {
  const { table } = useLocationPageTable();
  return (
    <section className="relative">
      <MaxWidth>
        <Container height="min-full" className="lg:pt-20">
          <MainHeadline>Destinace v okolí</MainHeadline>
          <MainSubheadline> {locationName}</MainSubheadline>
          <div className="overflow-x-auto">
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
