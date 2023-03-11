import { ClassName } from "@/domains";
import React, { PropsWithChildren } from "react";

interface MaxWidthProps extends PropsWithChildren {
  className?: ClassName;
}

export const MaxWidth = ({ children, className }: MaxWidthProps) => {
  return (
    <div className={`mx-auto max-w-screen-2xl px-8  md:px-14 ${className}`}>
      {children}
    </div>
  );
};
