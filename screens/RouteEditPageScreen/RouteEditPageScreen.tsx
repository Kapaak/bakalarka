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

  const { query } = useRouter();

  const handleRouteReset = () => {
    setPage(RouteEditSteps.ROUTE);
  };

  const form = useForm<GeneratedRoute>({
    defaultValues: route,
  });

  const { getValues, reset, handleSubmit } = form;

  const { updateRouteDetail } = useUpdateRouteDetail();

  useEffect(() => {
    reset(route);
  }, [route, reset]);

  return (
    <TransparentCard>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((val) => console.log("submited"))}
          className="flex h-full w-full"
        >
          <button type="button" onClick={() => console.log(getValues())}>
            show form vals
          </button>
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
