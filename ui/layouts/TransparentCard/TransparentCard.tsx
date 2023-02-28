import { Container, HorizontalStack, MaxWidth } from "@/ui";
import { PropsWithChildren } from "react";

export const TransparentCard = ({ children }: PropsWithChildren) => {
  return (
    <section className="relative bg-gradient-to-r from-main-yellow to-main-orange">
      <MaxWidth>
        <Container fullHeight>
          <HorizontalStack className="relative z-10 h-full rounded-lg bg-transparent before:absolute before:z-negative before:h-full before:w-full before:rounded-lg before:bg-white before:opacity-50 before:content-['']">
            {children}
          </HorizontalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
