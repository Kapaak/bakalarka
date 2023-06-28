import { ReactNode } from "react";

interface TableHeaderCellProps {
  icon: ReactNode;
  title: string;
}

export const TableHeaderCell = ({ icon, title }: TableHeaderCellProps) => {
  return (
    <div className="mr-5 flex flex-col gap-1 text-start">
      <div>{icon}</div>
      <h2>{title}</h2>
    </div>
  );
};
