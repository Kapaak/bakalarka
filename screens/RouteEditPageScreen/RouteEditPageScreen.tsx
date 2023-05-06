import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { MapContainer } from "@/components";
import { GeneratedRoute } from "@/domains";
import { useUpdateRouteDetail } from "@/hooks";
import { Button, TransparentCard } from "@/ui";

import { EditDetail, EditRoute } from "./components";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

interface RouteEditPageScreenProps {
  route: GeneratedRoute;
}

export const RouteEditPageScreen = ({ route }: RouteEditPageScreenProps) => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  const { query, ...router } = useRouter();

  const form = useForm<GeneratedRoute>({
    defaultValues: route,
  });

  const { getValues, reset, handleSubmit } = form;

  const { updateRouteDetail } = useUpdateRouteDetail();

  const onSubmit = (routeData: GeneratedRoute) => {
    updateRouteDetail(query.routeId as string, routeData);

    setTimeout(() => {
      router.push(`/locations/${query.locationId}/${query.routeId}`);
    }, 300);
  };

  const handleRouteReset = () => {
    //tady je potreba resetovat, reset(route), aby to fungovalo
    setPage(RouteEditSteps.ROUTE);
  };

  useEffect(() => {
    reset(route);
  }, [route, reset]);

  return (
    <TransparentCard returnPath={`/locations/${query.locationId}`}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full">
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
        </form>
      </FormProvider>
    </TransparentCard>
  );
};
