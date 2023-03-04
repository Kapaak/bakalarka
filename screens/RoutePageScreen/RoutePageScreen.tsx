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
      <VerticalStack className="flex-1 p-12">
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
      <div className="flex-1 border border-red-500 p-4">
        <MapContainer />
      </div>
    </TransparentCard>
  );
};
