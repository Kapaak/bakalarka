import { ClassName } from "@/domains";
import { HTMLAttributes, PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: ClassName;
  fullHeight?: boolean;
}

//todo .. add CVA abych mohl delat podminky v tailwind, prozatim dam natvrdo 100vh
export const Container = ({
  children,
  fullHeight,
  className,
}: ContainerProps) => {
  return (
    <div className={`${fullHeight && "h-screen"} ${className}`}>{children}</div>
  );
};
