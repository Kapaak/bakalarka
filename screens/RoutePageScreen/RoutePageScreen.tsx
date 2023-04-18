import { useRouter } from "next/router";

import { Route } from "@/domains";
import { Button, TransparentCard, VerticalStack } from "@/ui";
import { MapContainer } from "components/Map";

import { RouteLabel } from "./components";

interface RoutePageScreenProps {
  route: Route;
}

export const RoutePageScreen = ({ route }: RoutePageScreenProps) => {
  const router = useRouter();

  return (
    <TransparentCard>
      <VerticalStack className="flex-1 gap-4 p-12 lg:flex">
        <RouteLabel title="Název trasy" description={route?.name} />
        <RouteLabel title="Popis trasy" description={route?.description} />
        {/* <RouteLabel title="Počet kilometrů" description={route?.distance} /> */}

        <Button
          onClick={() => {
            const { locationId, routeId } = router.query;
            router.push(`/locations/${locationId}/${routeId}/edit`);
          }}
          className="mt-auto mr-auto hidden lg:block"
        >
          Upravit
        </Button>
      </VerticalStack>
      <div className="relative h-[35rem] border border-red-500 lg:h-full lg:flex-1 lg:p-4">
        <MapContainer />
      </div>
    </TransparentCard>
  );
};
