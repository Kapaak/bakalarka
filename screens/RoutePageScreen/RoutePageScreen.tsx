import { useRouter } from "next/router";

import { useRouteContext } from "@/contexts";
import { Button, TransparentCard, VerticalStack } from "@/ui";
import { MapContainer } from "components/Map";

//   from: { lat: 49.1839069, lng: 16.5304978 },
//   to: { lat: 49.1839069, lng: 16.7809511 },

export const RoutePageScreen = () => {
  const router = useRouter();
  const { updateStartPoint, updateFinishPoint, startPoint } = useRouteContext();

  return (
    <TransparentCard>
      {/* <button onClick={() => console.log(startPoint, "dsa")}>
        start poitn
      </button>
      <Button
        onClick={() => updateStartPoint({ lat: 49.1839069, lng: 16.5304978 })}
      >
        update start point
      </Button>
      <Button
        onClick={() => updateFinishPoint({ lat: 49.1839069, lng: 16.7809511 })}
      >
        update finish point
      </Button> */}
      <div className="relative flex-1 lg:p-4">
        <MapContainer />
      </div>
      <VerticalStack className="flex-1 p-12 lg:flex">
        <div>
          <p>Název trasy</p>
          <p>Okolo potoka</p>
        </div>
        <div>
          <p>Popis trasy</p>
          <p>Příjemné posezení, kolem rybníku. Dalo se zde i koupat.</p>
        </div>
        <div>
          <div>
            <p>počet km</p>
            <p>32</p>
          </div>
        </div>
        <Button
          onClick={() => {
            const { locationId, routeId } = router.query;
            router.push(`/locations/${locationId}/${routeId}/edit`);
          }}
          className="mt-auto mr-auto"
        >
          Upravit
        </Button>
      </VerticalStack>
    </TransparentCard>
  );
};
