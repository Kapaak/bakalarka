import { ReactNode } from "react";

interface TableHeaderCellProps {
  icon: ReactNode;
  title: string;
}

export const TableHeaderCell = ({ icon, title }: TableHeaderCellProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div>{icon}</div>
      <h2>{title}</h2>
    </div>
  );
};
