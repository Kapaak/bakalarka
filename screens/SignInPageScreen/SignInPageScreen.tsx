import { FormProvider, useForm } from "react-hook-form";

import { SignUpFormModel } from "@/domains";
import {
  Button,
  Container,
  Divider,
  FormInput,
  HorizontalStack,
  ImageDividerLayout,
  MainHeadline,
  MaxWidth,
  Text,
  VerticalStack,
} from "@/ui";

import { SignInOptions, SignInPanel } from "./components";

export const SignInPageScreen = () => {
  const form = useForm<SignUpFormModel>();

  const { handleSubmit } = form;

  const onSubmit = (formVals: SignUpFormModel) => {
    console.log(formVals, "form vals");
  };
  return (
    <section>
      <ImageDividerLayout
        image="/images/girls-on-ride.jpg"
        alt="Two girls riding a bike."
      >
        <MaxWidth className="flex-1">
          <Container height="full" place="center">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MainHeadline className="mb-20 text-center font-bold">
                  Rádi tě opět vidíme!
                </MainHeadline>
                <VerticalStack className="gap-4">
                  <VerticalStack className="mx-auto w-full gap-6">
                    <FormInput name="email" label="E-mail" />
                    <FormInput name="password" label="Heslo" />
                  </VerticalStack>

                  <Button color="secondary" className="self-end">
                    Přihlásit se
                  </Button>
                  <SignInPanel />

                  <HorizontalStack align="center" className="my-2 gap-8">
                    <Divider borderColor="secondary" />
                    <Text size="small" color="gray">
                      nebo
                    </Text>
                    <Divider borderColor="secondary" />
                  </HorizontalStack>

                  <SignInOptions />
                </VerticalStack>
              </form>
            </FormProvider>
          </Container>
        </MaxWidth>
      </ImageDividerLayout>
    </section>
  );
};
