import { Cell, flexRender, Row, RowModel } from "@tanstack/react-table";

export interface TableBodyProps<T> {
  rows?: RowModel<T>;
  onRowClick?: (row: Row<T>) => Promise<unknown> | unknown;
}

export function TableBody<T>({ rows, onRowClick }: TableBodyProps<T>) {
  const renderCell = (cell: Cell<T, unknown>) => {
    //@ts-ignore
    if (!cell.column?.columnDef?.meta?.align) {
      return flexRender(cell.column.columnDef.cell, cell.getContext());
    }

    let justifyContent = "flex-start";
    //@ts-ignore
    switch (cell.column?.columnDef?.meta?.align) {
      case "left":
        justifyContent = "flex-start";
        break;
      case "center":
        justifyContent = "center";
        break;
      case "right":
        justifyContent = "flex-end";
        break;
    }

    return (
      <div className="flex">
        {/* <div className="flex" justifyContent={justifyContent}> */}
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    );
  };

  const handleRowClick = (row: Row<T>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <tbody>
      {(rows?.rows ?? []).map((row) => (
        <tr
          key={row.id}
          onClick={() => handleRowClick(row)}
          className="relative border border-white border-b-slate-200 bg-white hover:border-b-main-orange"
        >
          {row.getVisibleCells().map((cell: Cell<T, unknown>) => (
            <td key={cell.id} className="p-2">
              <div className="flex justify-start text-start">
                {renderCell(cell)}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
