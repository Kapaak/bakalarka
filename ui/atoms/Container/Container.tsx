import { HtmlHTMLAttributes, PropsWithChildren } from "react";

import { cva, VariantProps } from "class-variance-authority";

// interface ContainerProps extends PropsWithChildren {
//   className?: ClassName;
//   fullHeight?: boolean;
//   centerXY?: boolean;
// }

const containerVariant = cva("", {
  variants: {
    height: {
      default: "",
      full: "h-screen max-h-[calc(100vh-9rem)]",
      "min-full": "min-h-[calc(100vh-9rem)]",
    },
    place: {
      default: "",
      center: "grid place-items-center",
    },
  },
  defaultVariants: {
    height: "default",
    place: "default",
  },
});

export type ContainerProps = HtmlHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariant>;

export const Container = ({
  children,
  height,
  place,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className={containerVariant({ height, place, className })}>
      {children}
    </div>
  );
};
