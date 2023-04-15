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
  CULTURE = "culture",
  TRAIL = "trail",
}

export type PlacesOfInterest = {
  swimming: boolean;
  pub: boolean;
  nature: boolean;
  trail: boolean;
  culture: boolean;
};

export type RouteEditFormModel = {
  name: string;
  description: string;
  bikeTypes: BikeTypes;
  placesOfInterest: PlacesOfInterest;
};

export type RouteRow = {
  id: string;
  name: string;
  value: string;
  distance: number;
  elevation?: number;
  likes: number;
  author: string;
  createdAt: string;
  interestingPlaces: string[]; //todo -> update type
};

export type Route = {
  id: string;
  createdAt: string;
  name: string;
  authorId: string;
  description: string;
  distance: number;
  elevation?: number;
  terrain: string[];
  interestingPlaces: string[];
  author: User;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  routes?: Route[];
};

export type TranslatedPoints = {
  startPoint: string;
  finishPoint: string;
  crossingPoints: Array<string>;
};

export type RoutePoint = {
  id: string;
  coordinates: LatLngLiteral;
  value: string;
};

export type RouteModel = {
  routePoints: RoutePoint[];
};

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type Map = google.maps.Map;
export type AutocompletePrediction = google.maps.places.AutocompletePrediction;

export type Location = {
  coordinates: LatLngLiteral;
  name: string;
};

export type CreateRoute = Omit<Route, "createdAt" | "id">;
