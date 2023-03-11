import { RouteContextProvider } from "@/contexts";
import { NextPage } from "next";
import { RouteEditPageScreen } from "../../../../screens";

const EditPage: NextPage = () => {
  return (
    <RouteContextProvider>
      <RouteEditPageScreen />
    </RouteContextProvider>
  );
};
export default EditPage;
