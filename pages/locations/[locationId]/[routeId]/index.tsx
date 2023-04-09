import { NextPage } from "next";

import { RouteContextProvider } from "@/contexts";
import { RoutePageScreen } from "@/screens";

export const RoutePage: NextPage = () => {
  return (
    <RouteContextProvider>
      <RoutePageScreen />
    </RouteContextProvider>
  );
};

export default RoutePage;
