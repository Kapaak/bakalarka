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

export const useLocationPageTable = () => {
  const dummyData = useMemo(
    () => [
      {
        id: "1",
        name: "Okolo potoka",
        value: "okolo-potoka",
        distance: 32,
        elevation: 150,
        author: "Pavel Zapletal",
        likes: 12,
        createdAt: "10-10-2010",
        placesOfInterest: "TODO",
      },
      {
        id: "2",
        name: "Lukovská štreka",
        value: "lukovska-streka",
        distance: 42,
        elevation: 340,
        author: "Barunka Nováková",
        likes: 152,
        createdAt: "21-02-2022",
        placesOfInterest: "TODO",
      },
    ],
    []
  );

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
      columnHelper.accessor("author", {
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
      columnHelper.accessor("placesOfInterest", {
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
            href={`/locations/${query.locationId}/${info.row.original.value}`}
          >
            <Button variant="plain">zobrazit trasu</Button>
          </NextLink>
        ),
      }),
    ];
  }, [query.locationId]);

  const table = useReactTable<RouteRow>({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
  };
};
