import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { MapContainer } from "@/components";
import { GeneratedRoute } from "@/domains";
import { useCreateNewRoute } from "@/hooks";
import { Button, TransparentCard } from "@/ui";

import { EditDetail, EditRoute } from "./components";

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

  const router = useRouter();

  const form = useForm<GeneratedRoute>({
    defaultValues: route,
  });

  const { reset, handleSubmit, getValues } = form;

  const { createTodo } = useCreateNewRoute();

  const onSubmit = (routeData: GeneratedRoute) => {
    const newData = structuredClone(routeData);

    //@ts-ignore
    const newRouteData = routeData.detail.regions.map((data) => data.value);

    newData.authorId = route.authorId;
    newData.detail.regions = newRouteData;

    createTodo(newData);

    setTimeout(() => {
      router.push("/locations");
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
    <TransparentCard returnPath="/locations">
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
        <button type="button" onClick={() => console.log(getValues())}>
          show
        </button>
      </FormProvider>
    </TransparentCard>
  );
};