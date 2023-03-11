import { LatLngLiteral } from "@/domains";
import { useMemo } from "react";
import { useQuery } from "react-query";

interface ElevationProps {
  coordinates: LatLngLiteral;
}

type Feature = {
  type: "Feature";
  id: number;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    ele: number;
    index: number;
    tilequery: {
      distance: number;
      geometry: string;
      layer: string;
    };
  };
};

type Elevation = {
  features: Feature[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

//teoreticky bych nemusel passovat nic a pak casem to naplnit az
export const useElevation = ({ coordinates }: ElevationProps) => {
  const { lat, lng } = coordinates;

  const { isLoading, data } = useQuery<Elevation>("elevation", () =>
    fetcher(
      `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lat},${lng}.json?layers=contour&limit=50&access_token=${process.env.NEXT_PUBLIC_MAPBOX}`
    )
  );

  const getHighestElevation = useMemo(() => {
    const elevations: Array<number> = (data?.features ?? []).map(
      (feature) => feature.properties.ele
    );
    return Math.max(...elevations);
  }, [data?.features]);

  console.log(getHighestElevation, "ww");

  // const { isLoading, data } = useQuery("elevation", () =>
  //   fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
  //     (res) => res.json()
  //   )
  // );
  return {
    data: getHighestElevation,
  };
};
