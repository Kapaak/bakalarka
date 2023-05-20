import { HTMLAttributes } from "react";

import { VariantProps, cva } from "class-variance-authority";

const hrVariant = cva("w-full", {
  variants: {
    borderColor: {
      primary: ["border-black"],
      secondary: ["border-main-orange"],
    },
  },
  defaultVariants: {
    borderColor: "primary",
  },
});

export type HrProps = HTMLAttributes<HTMLHRElement> &
  VariantProps<typeof hrVariant>;

export const Divider = ({ borderColor, className }: HrProps) => {
  return <hr className={hrVariant({ borderColor, className })} />;
};
