import { ClassName } from "@/domains";
import React, { PropsWithChildren } from "react";

interface MainHeadlineProps extends PropsWithChildren {
  className?: ClassName;
}

export const MainHeadline = ({ children, className }: MainHeadlineProps) => {
  return <h1 className={`max-w-md text-6xl ${className}`}>{children}</h1>;
};
