import { PropsWithChildren } from "react";

import { ClassName } from "@/domains";

interface MainHeadlineProps extends PropsWithChildren {
  className?: ClassName;
}

export const MainHeadline = ({ children, className }: MainHeadlineProps) => {
  return (
    <h1 className={`text-4xl lg:text-5xl lg:leading-[1.1] ${className}`}>
      {children}
    </h1>
  );
};
