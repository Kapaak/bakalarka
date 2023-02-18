import React from "react";
import {
  Container,
  HorizontalStack,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  SearchBar,
} from "@/ui";
import Image from "next/image";

export const HomePageScreen = () => {
  return (
    <section className="relative bg-main-yellow">
      <MaxWidth>
        <Container>
          <HorizontalStack className="h-full justify-between gap-4">
            <div>
              <MainHeadline className="font-bold">
                Cestujte a objevujte nové kouty
              </MainHeadline>
              <MainSubheadline className="font-bold">
                ze sedla svého kola
              </MainSubheadline>
            </div>
            <div className="relative z-10 flex-1">
              <Image
                src="/images/hero-img.jpg"
                alt="Cyklista sprintující na kole"
                fill
                className="max-h-full max-w-full object-contain object-right"
              />
            </div>
          </HorizontalStack>
        </Container>
      </MaxWidth>
      <div className="absolute bottom-0 h-1/4 w-full bg-white pt-4">
        <MaxWidth>
          <SearchBar
            options={[
              { label: "Brno", value: "brno" },
              { label: "Olomouc", value: "olomouc" },
            ]}
          />
        </MaxWidth>
      </div>
    </section>
  );
};
