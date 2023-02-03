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

export const Button = ({ children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button className="rounded-small bg-black px-6 py-2 text-white shadow-lg">
      {children}
    </button>
  );
};
