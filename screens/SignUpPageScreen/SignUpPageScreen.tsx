import { FormProvider, useForm } from "react-hook-form";

import { useRegisterUser } from "@/adapters";
import { SignUpFormModel } from "@/domains";
import {
  Button,
  Container,
  FormInput,
  ImageDividerLayout,
  MainHeadline,
  MaxWidth,
  TextAction,
  VerticalStack,
} from "@/ui";

export const SignUpPageScreen = () => {
  const { registerUser, isLoading } = useRegisterUser();

  const form = useForm<SignUpFormModel>();

  const { handleSubmit } = form;

  const onSubmit = async (formVals: SignUpFormModel) => {
    if (formVals.password === formVals.verifyPassword) {
      registerUser({
        name: formVals.name,
        email: formVals.email,
        password: formVals.password,
      });
    }
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
                  Vítejte!
                </MainHeadline>
                <VerticalStack className="gap-4">
                  <VerticalStack className="w-full gap-6">
                    <FormInput name="name" label="Jméno" />
                    <FormInput name="email" label="E-mail" />
                    <FormInput name="password" label="Heslo" type="password" />
                    <FormInput
                      name="verifyPassword"
                      label="Potvrzení hesla"
                      type="password"
                    />
                  </VerticalStack>
                  <TextAction
                    text="Už máte účet?"
                    action="Přihlásit se"
                    href="/sign-in"
                  />

                  <Button
                    color="secondary"
                    className="ml-auto"
                    isLoading={isLoading}
                  >
                    Vytvořit účet
                  </Button>
                </VerticalStack>
              </form>
            </FormProvider>
          </Container>
        </MaxWidth>
      </ImageDividerLayout>
    </section>
  );
};
