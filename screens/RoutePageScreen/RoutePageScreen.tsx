import {
  Button,
  Container,
  HorizontalStack,
  MaxWidth,
  TransparentCard,
  VerticalStack,
} from "@/ui";
import { MapContainer } from "components/Map";
import { useRouter } from "next/router";

export const RoutePageScreen = () => {
  const router = useRouter();
  return (
    <TransparentCard>
      <VerticalStack className="hidden flex-1 p-12 lg:flex">
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
      <div className="relative flex-1 lg:p-4">
        <MapContainer />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white p-4 lg:hidden">
          <p>Název trasy</p>
          <p>Okolo potoka</p>
        </div>
      </div>
    </TransparentCard>
  );
};
