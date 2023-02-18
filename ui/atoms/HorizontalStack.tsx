import { ClassName } from "@/domains";
import { PropsWithChildren } from "react";

interface HorizontalStackProps {
  className?: ClassName;
}

export const HorizontalStack = ({
  children,
  className,
}: PropsWithChildren<HorizontalStackProps>) => {
  return <div className={`flex ${className}`}>{children}</div>;
};
