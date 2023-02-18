import { ClassName } from "@/domains";
import { HTMLAttributes, PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  maxHeight?: boolean;
  className?: ClassName;
}

//todo .. add CVA abych mohl delat podminky v tailwind, prozatim dam natvrdo 100vh
export const Container = ({
  children,
  maxHeight,
  className,
}: ContainerProps) => {
  return <div className={`h-screen ${className}`}>{children}</div>;
};
