import { Button, TransparentCard } from "@/ui";
import { MapContainer } from "@/components";
import { EditDetail, EditRoute } from "./components";
import { useState } from "react";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

export const RouteEditPageScreen = () => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  return (
    <TransparentCard>
      {isDetailPage && <EditDetail />}
      {isRoutePage && (
        <EditRoute onReturn={() => setPage(RouteEditSteps.DETAIL)} />
      )}
      <div className="relative flex-1 border border-red-500 p-4">
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
