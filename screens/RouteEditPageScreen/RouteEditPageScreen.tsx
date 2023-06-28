import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { MapContainer } from "@/components";
import { GeneratedRoute } from "@/domains";
import { useUpdateRouteDetail } from "@/hooks";
import { Button, TransparentCard } from "@/ui";
import { convertMetersToKilometers, locations } from "@/utils";
import { useRouteContext } from "contexts/RouteContext";

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

  const { reset, handleSubmit } = form;

  const { distance } = useRouteContext();

  const { updateRouteDetail, isLoading } = useUpdateRouteDetail();

  const onSubmit = (routeData: GeneratedRoute) => {
    const newRouteData = { ...routeData };

    newRouteData.detail.distance = +convertMetersToKilometers(distance);
    newRouteData.detail.regions = newRouteData.detail.regions.map(
      //@ts-ignore
      (region) => region.value
    );

    updateRouteDetail(query.routeId as string, newRouteData);

    setTimeout(() => {
      router.push(`/locations/${query.locationId}/${query.routeId}`);
    }, 300);
  };

  const handleRouteReset = () => {
    //tady je potreba resetovat, reset(route), aby to fungovalo
    setPage(RouteEditSteps.ROUTE);
  };

  useEffect(() => {
    //   //by default regions contain only value, but I need to have also label
    const updatedRoute = structuredClone(route);

    const regions = locations.filter((location) =>
      route.detail.regions.includes(location.value)
    );

    //@ts-ignore -> need to update type detail.regions from string to {label:string,value:string}
    updatedRoute.detail.regions = regions;

    reset(updatedRoute);
  }, [route, reset]);

  return (
    <TransparentCard returnPath={`/locations/${query.locationId}`}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full">
          {isDetailPage && <EditDetail isLoading={isLoading} />}
          {isRoutePage && (
            <EditRoute
              onReturn={() => setPage(RouteEditSteps.DETAIL)}
              onReset={handleRouteReset}
            />
          )}
          <div className="relative flex-1 p-4">
            {/* //tady staticView uplne nejde .. hod to na jinou page casem  */}
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
