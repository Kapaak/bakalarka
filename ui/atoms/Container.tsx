import { ClassName } from "@/domains";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: ClassName;
  fullHeight?: boolean;
  centerXY?: boolean;
}

//todo .. add CVA abych mohl delat podminky v tailwind, prozatim dam natvrdo 100vh
export const Container = ({
  children,
  fullHeight,
  className,
  centerXY,
}: ContainerProps) => {
  return (
    <div
      className={`${fullHeight && "h-screen max-h-[calc(100vh-5.5rem)] px-8"} ${
        centerXY && "grid place-items-center"
      } ${className}`}
    >
      {children}
    </div>
  );
};
