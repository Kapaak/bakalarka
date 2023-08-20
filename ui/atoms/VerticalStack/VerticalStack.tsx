import { PropsWithChildren } from "react";

import { ClassName } from "@/domains";

interface VerticalStackProps {
  className?: ClassName;
}

export const VerticalStack = ({
  children,
  className,
}: PropsWithChildren<VerticalStackProps>) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};
