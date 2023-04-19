import { useState } from "react";

import { MapContainer } from "@/components";
import { Route } from "@/domains";
import { useUpdateRouteDetail } from "@/hooks";
import { Button, TransparentCard } from "@/ui";

import { EditDetail, EditRoute } from "./components";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

interface RouteEditPageScreenProps {
  route: Route;
}

export const RouteEditPageScreen = ({ route }: RouteEditPageScreenProps) => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  const handleRouteReset = () => {
    setPage(RouteEditSteps.ROUTE);
  };

  const { updateRouteDetail } = useUpdateRouteDetail();

  return (
    <TransparentCard>
      <Button
        variant="outlined"
        type="button"
        onClick={() =>
          updateRouteDetail("6438f935a0c55e85281ab553", {
            name: "O kolečko ",
          })
        }
      >
        update detail
      </Button>
      {isDetailPage && <EditDetail />}
      {isRoutePage && (
        <EditRoute
          onReturn={() => setPage(RouteEditSteps.DETAIL)}
          onReset={handleRouteReset}
        />
      )}
      <div className="relative flex-1 p-4">
        <MapContainer />
        {isDetailPage && (
          <Button
            className="absolute top-8 left-8"
            color="secondary"
            onClick={() => setPage(RouteEditSteps.ROUTE)}
          >
            Upravit trasu
          </Button>
        )}
      </div>
    </TransparentCard>
  );
};
