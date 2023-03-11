import {
  Button,
  Container,
  GoogleComboBox,
  HorizontalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  VerticalStack,
} from "@/ui";
import { useRouter } from "next/router";
import { LocationCard } from "./components";

export const LocationPageScreen = () => {
  const router = useRouter();
  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth className="max-w-[60rem] lg:max-w-screen-2xl">
        <Container height="min-full" className="lg:pt-20">
          <VerticalStack className="lg:flex-row">
            <VerticalStack className="flex-1 gap-4">
              <MainHeadline>Oblíbené destinace ve vašem okolí</MainHeadline>
              <HorizontalStack className="items-center justify-between">
                <MainSubheadline>Olomouc</MainSubheadline>
                <Button onClick={() => router.push("/")} className="lg:hidden">
                  Změnit
                </Button>
              </HorizontalStack>
              <Button color="secondary" className="mb-4 lg:hidden">
                Upřesnit výběr
              </Button>
              <GoogleComboBox
                label="Změnit"
                placeholder="Změňte místo trasy"
                onSelect={() => {}}
                className="hidden lg:flex"
              />
            </VerticalStack>
            <VerticalStack className="flex-1 basis-1/3 gap-4 overflow-x-scroll lg:flex-row">
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
              <LocationCard
                title="Okolo potoka"
                href={"/locations/olomouc/okolo-potoka"}
              />
            </VerticalStack>
          </VerticalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
