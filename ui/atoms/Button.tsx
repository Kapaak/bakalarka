import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { CircleNotch } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariant = cva(
  [
    "flex items-center gap-2 rounded-small disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-200",
  ],
  {
    variants: {
      color: {
        primary: ["text-black"],
        secondary: ["text-main-orange"],
        error: ["text-red-500"],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-6"],
      },
      variant: {
        contained: "border",
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
        className: "border-black bg-black text-slate-50",
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
    // compoundVariants: [{ size: "medium", class: "uppercase" }], //nechapu co to je uplne // asi kdyz bude size:"medium", tak automaticky pridam dalsi class .. to bych mohl dat u  variants:{kde bych mel dotted around a ne , u dotted bych mel bg white}
    //In the case of needing to set styles of a variant, based on a combination of other variants, you can use the compoundVariants feature.
    defaultVariants: {
      size: "medium",
      color: "primary",
      variant: "contained",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariant> & {
    isLoading?: boolean;
  };

export const Button = ({
  children,
  color,
  size,
  className,
  variant,
  isLoading,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={buttonVariant({ color, size, variant, className })}
      {...rest}
    >
      {isLoading && <CircleNotch className="animate-spin" />} {children}
    </button>
  );
};
