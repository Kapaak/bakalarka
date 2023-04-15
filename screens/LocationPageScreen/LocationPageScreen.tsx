import { RouteRow } from "@/domains";
import { useLocationPageTable } from "@/hooks";
import {
  Container,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  Table,
} from "@/ui";
import { useGetAllRoutes } from "hooks/useRoutes";

interface LocationpageScreenProps {
  locationName?: string;
  locationValue?: string;
}

export const LocationPageScreen = ({
  locationName,
  locationValue,
}: LocationpageScreenProps) => {
  const { table } = useLocationPageTable();
  const { routes } = useGetAllRoutes();
  return (
    <section className="relative">
      <button onClick={() => console.log(routes)}>show all routes</button>
      {/* <section className="relative bg-gradient-to-r from-main-yellow to-main-orange"> */}
      <MaxWidth className="">
        <Container height="min-full" className="lg:pt-20">
          <MainHeadline>Destinace v okolí</MainHeadline>
          <MainSubheadline> {locationName}</MainSubheadline>
          <div className="overflow-x-auto">
            <Table<RouteRow>
              headerCells={table?.getHeaderGroups()}
              bodyCells={table?.getRowModel()}
            />
          </div>
          {/* <FavoriteLocations locationName={locationName} /> */}
        </Container>
      </MaxWidth>
    </section>
  );
};
