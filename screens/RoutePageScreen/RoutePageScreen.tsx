import { useRouter } from "next/router";

import { GeneratedRoute } from "@/domains";
import { Button, TransparentCard, VerticalStack } from "@/ui";
import { MapContainer } from "components/Map";

import { RouteLabel } from "./components";

interface RoutePageScreenProps {
  route: GeneratedRoute;
}

export const RoutePageScreen = ({ route }: RoutePageScreenProps) => {
  const { query, ...router } = useRouter();

  return (
    <TransparentCard returnPath={`/locations/${query.locationId}`}>
      <VerticalStack className="flex-1 gap-4 p-12 lg:flex">
        <RouteLabel title="Název trasy" description={route?.detail?.name} />
        <RouteLabel
          title="Popis trasy"
          description={route?.detail?.description}
        />
        <RouteLabel
          title="Počet kilometrů"
          description={route?.detail?.distance}
        />

        <Button
          onClick={() =>
            router.push(`/locations/${query.locationId}/${query.routeId}/edit`)
          }
          className="mt-auto mr-auto hidden lg:block"
        >
          Upravit
        </Button>
      </VerticalStack>
      <div className="relative h-[35rem] border border-red-500 lg:h-full lg:flex-1 lg:p-4">
        <MapContainer staticView />
      </div>
    </TransparentCard>
  );
};
