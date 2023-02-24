import { HTMLAttributes } from "react";

export type ClassName = HTMLAttributes<HTMLDivElement>["className"];

export type AutocompleteOption = {
  id?: number | string;
  label: string;
  value: string;
};

export type SignUpFormModel = {
  name?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
};
