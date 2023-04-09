import {
  Button,
  Container,
  MainHeadline,
  MainSubheadline,
  MaxWidth,
  VerticalStack,
} from "@/ui";

import NextLink from "next/link";

const ErrorPage = () => {
  return (
    <MaxWidth>
      <Container height="full">
        <VerticalStack className="h-full items-center justify-center">
          <div>
            <MainHeadline className="text-shadow-regular">
              ERROR 404
            </MainHeadline>
            <MainSubheadline>
              Stránka nenalezena! <br /> Ale to nevadí, zkuste nové vyhledávání.
            </MainSubheadline>
            <NextLink href="/">
              <Button className="mt-4">Hlavní stránka</Button>
            </NextLink>
          </div>
        </VerticalStack>
      </Container>
    </MaxWidth>
  );
};
export default ErrorPage;
