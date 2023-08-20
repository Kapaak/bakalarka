import { HeaderGroup, Row, RowData, RowModel } from "@tanstack/react-table";

import "@tanstack/react-table";
import { TableBody, TableHeader } from "../../molecule";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right";
  }
}

export interface TableProps<T> {
  headerCells?: HeaderGroup<T>[];
  footerCells?: HeaderGroup<T>[];
  bodyCells?: RowModel<T>;
  onRowClick?: (row: Row<T>) => Promise<unknown> | unknown;
  isLoading?: boolean;
  showAllBorders?: boolean;
  headerTextUnderlined?: boolean;
}

export function Table<T>({
  headerCells,
  footerCells,
  bodyCells,
  onRowClick,
  isLoading = false,
  ...props
}: TableProps<T>) {
  return (
    <>
      <table {...props} className="w-full">
        <TableHeader rows={headerCells} />
        <TableBody rows={bodyCells} onRowClick={onRowClick} />
      </table>

      {/* <TableLoadingIndicator
        isLoading={isLoading}
        hasData={bodyCells && bodyCells.rows.length > 0}
      /> */}
    </>
  );
}
