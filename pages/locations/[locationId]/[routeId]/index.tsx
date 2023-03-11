import { NextPage } from "next";
import { RoutePageScreen } from "@/screens";
import { RouteContextProvider } from "@/contexts";

export const RoutePage: NextPage = () => {
  return (
    <RouteContextProvider>
      <RoutePageScreen />
    </RouteContextProvider>
  );
};

export default RoutePage;
