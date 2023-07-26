import { HTMLAttributes } from "react";

import {
  Prisma,
  Route as PrismaRoute,
  User as PrismaUser,
} from "@prisma/client";

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
  CHILDREN = "children",
}

export type PlacesOfInterest = {
  swimming: boolean;
  pub: boolean;
  nature: boolean;
  children: boolean;
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
  distance: number;
  elevation?: number;
  likes: number;
  authorName: string;
  createdAt: string;
  interestingPlaces: string[];
};

export type Route = {
  id: string;
  createdAt: any;
  name: string;
  authorId: string;
  description: string;
  distance: number;
  elevation?: number | null;
  terrain: string[];
  interestingPlaces: string[];
  author?: User;
  value: string;
};

export type GeneratedUser = PrismaUser;
export type GeneratedRoute = PrismaRoute;

export type GeneratedRouteWithAuthor = Prisma.RouteGetPayload<{
  include: { author: true };
}> &
  GeneratedRoute;

export type RefactorRoute = {
  id: string;
  createdAt: any;
  authorId: string;
  author: User;
  detail: {
    name: string;
    description: string;
    distance: number;
    elevation?: number;
    terrain: string[];
    interestingPlaces: string[];
    regions: string[];
  };
  routePoints: {
    id: string;
    coordinates: { lat: string; lng: string };
    value: string;
  }[];
};

export type RouteData = Omit<Route, "author" | "authorId" | "id" | "value">;

export type RegisterUser = {
  email?: string;
  name?: string;
  password?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  password?: string;
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

export type Region = { [region: string]: number };

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type Map = google.maps.Map;
export type AutocompletePrediction = google.maps.places.AutocompletePrediction;

export type Location = {
  coordinates: LatLngLiteral;
  name: string;
};

export type RoutesPerLocationResponse = {
  detail: { regions: string[] };
};

export type CreateRoute = Omit<Route, "createdAt" | "id">;
