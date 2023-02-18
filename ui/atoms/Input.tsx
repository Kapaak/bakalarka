import {
  InputHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = ({ children }: PropsWithChildren<InputProps>) => {
  return (
    <input className="rounded-small border border-red-500  px-6 py-2 shadow-lg">
      {children}
    </input>
  );
};
