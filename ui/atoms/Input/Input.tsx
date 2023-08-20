import { InputHTMLAttributes, PropsWithChildren } from "react";

import { cva, VariantProps } from "class-variance-authority";

const inputVariant = cva(["px-6", "py-2"], {
  variants: {
    variant: {
      outlined: "rounded-small shadow-regular",
      singleBorder: "border-black bg-transparent",
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariant> & {
    ref?: any;
  };

export const Input = ({
  className,
  children,
  variant,
  ...rest
}: PropsWithChildren<InputProps>) => {
  return (
    <input {...rest} className={inputVariant({ variant, className })}>
      {children}
    </input>
  );
};
