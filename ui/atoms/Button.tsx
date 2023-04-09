import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cva, type VariantProps } from "class-variance-authority";

const buttonVariant = cva(["rounded-small"], {
  variants: {
    color: {
      primary: ["bg-black", "text-white", "border-black"],
      secondary: ["bg-main-orange", "text-black", " border-main-orange"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-6"],
    },
    variant: {
      contained: "border",
      outlined: "border  border-dashed ",
      tinted: "",
    },
  },
  compoundVariants: [
    { variant: "outlined", class: "bg-transparent text-black" },
    {
      variant: "tinted",
      color: "secondary",
      class: "text-main-orange bg-light-orange",
    },
  ],
  // compoundVariants: [{ size: "medium", class: "uppercase" }], //nechapu co to je uplne // asi kdyz bude size:"medium", tak automaticky pridam dalsi class .. to bych mohl dat u  variants:{kde bych mel dotted around a ne , u dotted bych mel bg white}
  //In the case of needing to set styles of a variant, based on a combination of other variants, you can use the compoundVariants feature.
  defaultVariants: {
    size: "medium",
    color: "primary",
    variant: "contained",
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariant>;

export const Button = ({
  children,
  color,
  size,
  className,
  variant,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={buttonVariant({ color, size, variant, className })}
      {...rest}
    >
      {children}
    </button>
  );
};
