import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

// interface ButtonProps
//   extends DetailedHTMLProps<
//     ButtonHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   > {}

const buttonVariant = cva(["rounded-small"], {
  // ["rounded-small", " px-6", " py-2", " shadow-lg"],
  variants: {
    color: {
      primary: ["bg-black", "text-white"],
      secondary: ["bg-main-orange", "text-black"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-6"],
    },
    variant: {
      contained: "",
      outlined: "border border-black border-dashed ",
    },
  },
  compoundVariants: [{ variant: "outlined", class: "bg-gray-50" }],
  // compoundVariants: [{ size: "medium", class: "uppercase" }], //nechapu co to je uplne // asi kdyz bude size:"medium", tak automaticky pridam dalsi class .. to bych mohl dat u  variants:{kde bych mel dotted around a ne , u dotted bych mel bg white}
  //In the case of needing to set styles of a variant, based on a combination of other variants, you can use the compoundVariants feature.
  defaultVariants: {
    size: "medium",
    color: "primary",
    variant: "contained",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
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
      // className="rounded-small bg-black px-6 py-2 text-white shadow-lg"
    >
      {children}
    </button>
  );
};
