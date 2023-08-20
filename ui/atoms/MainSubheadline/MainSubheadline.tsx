import { PropsWithChildren } from "react";

import { ClassName } from "@/domains";

interface MainSubheadlineProps extends PropsWithChildren {
  className?: ClassName;
}

export const MainSubheadline = ({
  children,
  className,
}: MainSubheadlineProps) => {
  return <div className={`text-2xl lg:mt-2 ${className}`}>{children}</div>;
};
