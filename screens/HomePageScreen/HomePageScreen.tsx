import React from "react";
import {
  Button,
  Container,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
} from "@/ui";

export const HomePageScreen = () => {
  return (
    <section className="relative bg-main-yellow">
      <MaxWidth>
        <Container>
          <MainHeadline className="font-bold">
            Cestujte a objevujte nové kouty
          </MainHeadline>
          <MainSubheadline className="font-bold">
            ze sedla svého kola
          </MainSubheadline>
        </Container>
      </MaxWidth>
      <div className="absolute bottom-0 h-1/4 w-full bg-white pt-4">
        <MaxWidth>
          <Button>click me</Button>
        </MaxWidth>
      </div>
    </section>
  );
};
