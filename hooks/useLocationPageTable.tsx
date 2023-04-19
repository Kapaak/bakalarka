import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { RouteRow } from "@/domains";
import { Button, TableHeaderCell } from "@/ui";
import {
  CalendarBlank,
  Eye,
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

import { useGetAllRoutes } from "./useRoutes";

export const useLocationPageTable = () => {
  const { routes } = useGetAllRoutes();

  const { query } = useRouter();

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
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <NextLink
            href={`/locations/${query.locationId}/${info.row.original.id}`}
          >
            <Button variant="plain">zobrazit trasu</Button>
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
