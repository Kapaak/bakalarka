import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...rest}
      className="rounded-small bg-black px-6 py-2 text-white shadow-lg"
    >
      {children}
    </button>
  );
};
