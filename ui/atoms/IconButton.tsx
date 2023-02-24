import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";

interface IconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactElement;
}

export const IconButton = ({ icon, ...rest }: IconButtonProps) => {
  return <button {...rest}>{icon}</button>;
};
