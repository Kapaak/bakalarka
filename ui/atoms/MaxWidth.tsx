import { ClassName } from "@/domains";
import React, { PropsWithChildren } from "react";

interface MaxWidthProps extends PropsWithChildren {
  className?: ClassName;
}

export const MaxWidth = ({ children, className }: MaxWidthProps) => {
  return (
    <div className={`mx-auto max-w-screen-2xl ${className}`}>{children}</div>
  );
};
