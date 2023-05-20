import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";

import { VariantProps, cva } from "class-variance-authority";

const iconButtonVariant = cva(
  [
    "rounded-small disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-200",
  ],
  {
    variants: {
      color: {
        primary: ["text-black"],
        secondary: ["text-main-orange"],
        error: ["text-red-500"],
      },
      size: {
        small: "",
        medium: ["text-sm", "py-1", "px-2"],
      },
      variant: {
        contained: "",
        outlined: "border",
        tinted: "",
        plain: "uppercase font-bold",
      },
    },
    compoundVariants: [
      { variant: "outlined", class: "bg-transparent text-black" },
      {
        variant: "tinted",
        color: "secondary",
        class: "text-main-orange bg-light-orange",
      },
      {
        variant: "contained",
        color: "primary",
        className: "border-black",
      },
      {
        variant: "contained",
        color: "secondary",
        //nemuze byt text-black ,protoze to nepreppise predchozi color
        className: "bg-main-orange text-slate-900 border-main-orange",
      },
      {
        variant: "contained",
        color: "error",
        //nemuze byt text-black ,protoze to nepreppise predchozi color
        className: "bg-red-500 text-white border-red-500",
      },
    ],
    defaultVariants: {
      color: "primary",
      size: "small",
      variant: "contained",
    },
  }
);

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof iconButtonVariant> & {
    icon: ReactElement;
  };

export const IconButton = ({
  color,
  className,
  icon,
  ...rest
}: IconButtonProps) => {
  return (
    <button className={iconButtonVariant({ color, className })} {...rest}>
      {icon}
    </button>
  );
};
