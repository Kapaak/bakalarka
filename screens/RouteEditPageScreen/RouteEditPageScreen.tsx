import { Button, TransparentCard } from "@/ui";
import { MapContainer } from "@/components";
import { EditDetail, EditRoute } from "./components";
import { useState } from "react";
import { useRouteContext } from "@/contexts";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

export const RouteEditPageScreen = () => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);
  const { finishPoint, startPoint, updateStartPoint } = useRouteContext();

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  return (
    <TransparentCard>
      <Button
        type="button"
        onClick={() => updateStartPoint({ lat: 49.0039069, lng: 16.1304978 })}
      >
        upd point
      </Button>
      <Button type="button" onClick={() => console.log(startPoint, "star")}>
        show start point
      </Button>
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
