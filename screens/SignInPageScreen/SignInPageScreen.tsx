import { FormProvider, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

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
    signIn("credentials", {
      redirect: true,
      email: formVals.email,
      password: formVals.password,
      callbackUrl: `/`,
    });
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[40rem]"
              >
                <MainHeadline className="mb-20 text-center font-bold">
                  Rádi tě opět vidíme!
                </MainHeadline>
                <VerticalStack className="gap-4">
                  <VerticalStack className="mx-auto w-full gap-6">
                    <FormInput name="email" label="E-mail" />
                    <FormInput name="password" label="Heslo" type="password" />
                  </VerticalStack>

                  <SignInPanel />

                  <Button color="secondary" className="self-end">
                    Přihlásit se
                  </Button>

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
