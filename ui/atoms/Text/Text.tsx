import { ParamHTMLAttributes } from "react";

import { VariantProps, cva } from "class-variance-authority";

const textVariant = cva("", {
  variants: {
    color: {
      primary: ["text-black"],
      secondary: ["text-main-orange"],
      gray: ["text-black", "opacity-50"],
      danger: "text-red-500",
    },
    size: {
      small: "text-sm",
      regular: "text-md",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "regular",
  },
});

export type TextProps = ParamHTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariant>;

export const Text = ({ className, children, size, color }: TextProps) => {
  return <p className={textVariant({ color, size, className })}>{children}</p>;
};
