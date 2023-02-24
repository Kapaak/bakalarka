import {
  InputHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = ({
  className,
  children,
  ...rest
}: PropsWithChildren<InputProps>) => {
  return (
    <input
      {...rest}
      className={`rounded-small px-6 py-2 shadow-regular ${className}`}
    >
      {children}
    </input>
  );
};
