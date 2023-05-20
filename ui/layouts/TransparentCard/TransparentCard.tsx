import NextLink from "next/link";
import { PropsWithChildren } from "react";

import { Container, MaxWidth, VerticalStack } from "@/ui";
import { ArrowLeft } from "@phosphor-icons/react";

interface TransparentCardProps extends PropsWithChildren {
  returnPath: string;
}

export const TransparentCard = ({
  children,
  returnPath,
}: TransparentCardProps) => {
  return (
    <section className="relative">
      <MaxWidth className="px-0 md:px-0 lg:px-14">
        <Container height="min-full" className="flex flex-col lg:block">
          <NextLink
            href={returnPath}
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
