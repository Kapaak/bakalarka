import { Container, HorizontalStack, MaxWidth } from "@/ui";
import { PropsWithChildren } from "react";
import NextLink from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useRouter } from "next/router";

export const TransparentCard = ({ children }: PropsWithChildren) => {
  const { query } = useRouter();

  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth className="px-0 md:px-0 lg:px-14">
        <Container height="full">
          <NextLink
            href={`/locations/${query.locationId}`}
            className="mb-4 flex items-center gap-2 py-2 px-4 lg:px-0"
          >
            <ArrowLeft weight="bold" /> Zpět na seznam všech tras
          </NextLink>

          <HorizontalStack className="relative z-10 h-full rounded-lg bg-transparent before:absolute before:z-negative before:h-full before:w-full before:rounded-lg before:bg-white before:opacity-50 before:content-['']">
            {children}
          </HorizontalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
