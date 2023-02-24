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
        <Container fullHeight className="max-h-[calc(100vh-5.5rem)]">
          <HorizontalStack className="h-full justify-between gap-4">
            <div className="flex-1">
              <MainHeadline className="max-w-md font-bold">
                Cestujte a objevujte nové kouty
              </MainHeadline>
              <MainSubheadline className="font-bold">
                ze sedla svého kola
              </MainSubheadline>
            </div>
            <div className="relative z-20 flex-1 border border-red-500 ">
              <Image
                src="/images/hero-img.jpg"
                alt="Cyklista sprintující na kole"
                fill
                className="z-0 max-h-full max-w-full object-contain object-right pb-8"
              />
            </div>
          </HorizontalStack>
        </Container>
      </MaxWidth>
      <div className="absolute bottom-0 z-10 h-1/4 w-full bg-white pt-8">
        <MaxWidth>
          <SearchBar
            options={[
              { id: "1", label: "Brno", value: "brno" },
              { id: "2", label: "Olomouc", value: "olomouc" },
            ]}
          />
        </MaxWidth>
      </div>
    </section>
  );
};
