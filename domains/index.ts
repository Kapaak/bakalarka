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

export enum BikeType {
  GRAVEL = "gravel",
  MTB = "mtb",
  ROAD = "road",
}

export type BikeTypes = {
  gravel: boolean;
  mtb: boolean;
  road: boolean;
};

export enum PlaceOfInterest {
  SWIMMING = "swimming",
  PUB = "pub",
  NATURE = "nature",
  TRAIL = "trail",
}

export type PlacesOfInterest = {
  swimming: boolean;
  pub: boolean;
  nature: boolean;
  trail: boolean;
};

export type RouteEditFormModel = {
  name: string;
  description: string;
  bikeTypes: BikeTypes;
  placesOfInterest: PlacesOfInterest;
};
