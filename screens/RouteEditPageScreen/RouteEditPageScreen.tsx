import { useState } from "react";

import { MapContainer } from "@/components";
import { useRouteContext } from "@/contexts";
import { Button, TransparentCard } from "@/ui";
import { handleReverseGeocoding } from "@/utils";

import { EditDetail, EditRoute } from "./components";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

export const RouteEditPageScreen = () => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);
  const { finishPoint, startPoint, updateStartPoint, crossingPoints } =
    useRouteContext();

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  return (
    <TransparentCard>
      {isDetailPage && <EditDetail />}
      <button
        onClick={() =>
          handleReverseGeocoding({ lat: 2, lng: 1 }).then((val) =>
            console.log(val.data)
          )
        }
      >
        test
      </button>
      <button
        onClick={() => console.log(finishPoint, crossingPoints, startPoint)}
      >
        show
      </button>
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
