import { HTMLAttributes, PropsWithChildren } from "react";

import { VariantProps, cva } from "class-variance-authority";

const horizontalStackVariant = cva("flex", {
  variants: {
    justify: {
      normal: ["justify-normal"],
      start: ["justify-start"],
      center: ["justify-center"],
      between: ["justify-center"],
      around: ["justify-center"],
      evenly: ["justify-evenly"],
    },
    align: {
      stretch: ["items-stretch"],
      start: ["items-start"],
      end: ["items-end"],
      baseline: ["items-baseline"],
      center: ["items-center"],
    },
  },
  defaultVariants: {
    justify: "normal",
    align: "stretch",
  },
});

export type HorizontalStackProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof horizontalStackVariant>;

export const HorizontalStack = ({
  justify,
  align,
  children,
  className,
}: PropsWithChildren<HorizontalStackProps>) => {
  return (
    <div className={horizontalStackVariant({ justify, align, className })}>
      {children}
    </div>
  );
};
