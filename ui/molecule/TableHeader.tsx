import { flexRender, HeaderGroup } from "@tanstack/react-table";

export interface TableHeaderProps<T> {
  rows?: Array<HeaderGroup<T>>;
}

export const TableHeader = <T,>({ rows }: TableHeaderProps<T>) => {
  return (
    <thead>
      {(rows ?? []).map((columns) => (
        <tr
          key={columns.id}
          className="border-2 border-white border-b-main-orange bg-white"
        >
          {columns.headers.map((cell) => {
            return (
              <td
                key={cell.id}
                className="p-2"
                {...{ onClick: cell.column?.getToggleSortingHandler() }}
              >
                {flexRender(cell.column.columnDef.header, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
