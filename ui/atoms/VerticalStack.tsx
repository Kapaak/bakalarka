import { ClassName } from "@/domains";
import { PropsWithChildren } from "react";

interface VerticalStackProps {
  className?: ClassName;
}

export const VerticalStack = ({
  children,
  className,
}: PropsWithChildren<VerticalStackProps>) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};
