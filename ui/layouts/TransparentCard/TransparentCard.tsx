import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { Container, MaxWidth, VerticalStack } from "@/ui";
import { ArrowLeft } from "@phosphor-icons/react";

export const TransparentCard = ({ children }: PropsWithChildren) => {
  const { query } = useRouter();

  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth className="px-0 md:px-0 lg:px-14">
        <Container height="min-full" className="flex flex-col lg:block">
          <NextLink
            href={`/locations/${query.locationId}`}
            className="mb-4 flex items-center gap-2 py-2 px-4 lg:px-0"
          >
            <ArrowLeft weight="bold" /> Zpět na seznam všech tras
          </NextLink>

          <VerticalStack className="relative z-10 h-[40rem] flex-1 flex-col-reverse rounded-lg bg-transparent before:absolute before:z-negative before:h-full before:w-full before:rounded-lg before:bg-white before:opacity-50 before:content-[''] lg:h-[70rem] lg:flex-row">
            {children}
          </VerticalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
