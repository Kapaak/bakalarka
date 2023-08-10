import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

import { EditDetail, EditRoute, MapContainer } from "@/components";
import { GeneratedRoute } from "@/domains";
import { useCreateNewRoute } from "@/hooks";
import { Button, TransparentCard } from "@/ui";
import { convertMetersToKilometers } from "@/utils";
import { useRouteContext } from "contexts/RouteContext";

enum RouteEditSteps {
  DETAIL = "detail",
  ROUTE = "route",
}

interface CreateRoutePageScreenProps {
  route: GeneratedRoute;
}

export const CreateRoutePageScreen = ({
  route,
}: CreateRoutePageScreenProps) => {
  const [page, setPage] = useState(RouteEditSteps.DETAIL);

  const isDetailPage = page === RouteEditSteps.DETAIL;
  const isRoutePage = page === RouteEditSteps.ROUTE;

  const { query, ...router } = useRouter();

  const { distance } = useRouteContext();

  const form = useForm<GeneratedRoute>({
    defaultValues: route,
  });

  const { reset, handleSubmit } = form;

  const notifyError = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
      style: {
        zIndex: "90",
      },
    });
  const { createRoute, isLoading } = useCreateNewRoute();

  const onSubmit = (routeData: GeneratedRoute) => {
    const newData = { ...routeData };
    if (newData.routePoints.length === 0) {
      notifyError("Trasa musí mít zadaný alespoň počáteční a koncový bod.");
      return;
    }

    newData.detail.distance = +convertMetersToKilometers(distance);
    //@ts-ignore
    const newRouteData = routeData.detail.regions.map((region) => region.value);

    newData.authorId = route.authorId;
    newData.detail.regions = newRouteData;

    createRoute(newData).finally(() => {
      router.push(`/locations`);
    });
  };

  const handleRouteReset = () => {
    //tady je potreba resetovat, reset(route), aby to fungovalo
    setPage(RouteEditSteps.ROUTE);
  };

  useEffect(() => {
    reset(route);
  }, [route, reset]);

  return (
    <TransparentCard returnPath="/locations">
      <Toaster />
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
