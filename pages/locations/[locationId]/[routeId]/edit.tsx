import { NextPage } from "next";

import { RouteContextProvider } from "@/contexts";

import { RouteEditPageScreen } from "../../../../screens";

const EditPage: NextPage = () => {
  return (
    <RouteContextProvider>
      <RouteEditPageScreen />
    </RouteContextProvider>
  );
};
export default EditPage;
