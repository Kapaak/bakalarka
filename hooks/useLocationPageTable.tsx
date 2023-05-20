import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { PlaceOfInterest, RouteRow } from "@/domains";
import { Button, HorizontalStack, TableHeaderCell } from "@/ui";
import {
  BeerStein,
  Bicycle,
  CalendarBlank,
  CastleTurret,
  Drop,
  Eye,
  Flower,
  Heart,
  Mountains,
  Path,
  PersonSimpleBike,
  User,
} from "@phosphor-icons/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useGetAllRoutesByLocation } from "./useRoutes";

export const useLocationPageTable = () => {
  const { query } = useRouter();

  const { routes } = useGetAllRoutesByLocation(query.locationId as string);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<RouteRow>();

    return [
      columnHelper.accessor("name", {
        header: () => (
          <TableHeaderCell
            title="Název trasy"
            icon={<PersonSimpleBike size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("distance", {
        header: () => (
          <TableHeaderCell
            title="Počet km"
            icon={<Path size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("elevation", {
        header: () => (
          <TableHeaderCell
            title="Převýšení"
            icon={<Mountains size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("likes", {
        header: () => (
          <TableHeaderCell
            title="Počet liků"
            icon={<Heart size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("authorName", {
        header: () => (
          <TableHeaderCell
            title="Trasu vytvořil"
            icon={<User size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("createdAt", {
        header: () => (
          <TableHeaderCell
            title="Datum přidání"
            icon={<CalendarBlank size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("interestingPlaces", {
        header: () => (
          <TableHeaderCell
            title="Po cestě uvidím"
            icon={<Eye size="25" className="text-main-orange" />}
          />
        ),
        cell: (info) => {
          const interestingPlaces = info.getValue();

          const hasInterestingPlace = (place: PlaceOfInterest) =>
            interestingPlaces?.includes(place) ? "#000" : "#00000040";

          return (
            <HorizontalStack className="gap-2">
              <BeerStein
                size={20}
                color={hasInterestingPlace(PlaceOfInterest.PUB)}
              />
              <Flower
                size={20}
                color={hasInterestingPlace(PlaceOfInterest.NATURE)}
              />
              <Drop
                size={20}
                color={hasInterestingPlace(PlaceOfInterest.SWIMMING)}
              />
              <Bicycle
                size={20}
                color={hasInterestingPlace(PlaceOfInterest.TRAIL)}
              />
              <CastleTurret
                size={20}
                color={hasInterestingPlace(PlaceOfInterest.CULTURE)}
              />
            </HorizontalStack>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <NextLink
            href={`/locations/${query.locationId}/${info.row.original.id}`}
          >
            <Button variant="plain">zobrazit</Button>
          </NextLink>
        ),
      }),
    ];
  }, [query.locationId]);

  const table = useReactTable<RouteRow>({
    data: routes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
  };
};
