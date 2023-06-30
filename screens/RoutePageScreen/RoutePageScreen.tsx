import { useRouter } from "next/router";

import { GeneratedRoute } from "@/domains";
import { Button, TransparentCard, VerticalStack } from "@/ui";
import axios from "axios";
import { MapContainer } from "components/Map";

import { RouteLabel } from "./components";

interface RoutePageScreenProps {
  route: GeneratedRoute;
  isAuthor: boolean;
}

export const RoutePageScreen = ({ route, isAuthor }: RoutePageScreenProps) => {
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
        <RouteLabel
          title="Autor"
          //@ts-ignore uprav ten typ
          description={route?.author?.name}
        />
        {isAuthor && (
          <div className="mt-auto mr-auto hidden gap-4 lg:flex">
            <Button
              onClick={() =>
                router.push(
                  `/locations/${query.locationId}/${query.routeId}/edit`
                )
              }
            >
              Upravit
            </Button>
            <Button
              className="border-black hover:border-red-500 hover:bg-red-500 hover:text-white"
              variant="outlined"
              onClick={() => {
                axios
                  .delete(`/api/route?id=${route.id}`)
                  .then(() => {
                    console.log("route deleted");
                  })
                  .finally(() => {
                    router.push(`/locations`);
                  });
              }}
            >
              Odstranit
            </Button>
          </div>
        )}
      </VerticalStack>
      <div className="relative h-[35rem] lg:h-full lg:flex-1 lg:p-4">
        <MapContainer staticView />
      </div>
    </TransparentCard>
  );
};
