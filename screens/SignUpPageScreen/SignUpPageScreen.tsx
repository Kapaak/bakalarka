import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

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

  const notifySuccess = () =>
    toast.success("Účet byl registrován", {
      position: "bottom-right",
    });

  const notifyError = (message: string) =>
    toast.error(message, {
      position: "bottom-right",
    });

  const onSubmit = async (formVals: SignUpFormModel) => {
    if (formVals.password === formVals.verifyPassword) {
      registerUser({
        name: formVals.name,
        email: formVals.email,
        password: formVals.password,
      })
        .then(() => {
          notifySuccess();
        })
        .catch((error) => {
          if (error.response.status === 409) {
            return notifyError(error.response.data.message);
          }

          return notifyError("Nepodařilo se registrovat účet");
        });
    }
  };
  return (
    <section>
      <Toaster />
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
                autoComplete="off"
              >
                <MainHeadline className="mb-20 text-center font-bold">
                  Vítejte!
                </MainHeadline>
                <VerticalStack className="gap-4">
                  <VerticalStack className="w-full gap-6">
                    <FormInput name="name" label="Jméno" />
                    <FormInput
                      name="email"
                      label="E-mail"
                      //to remove autocomplete in chrome
                      readOnly
                      onFocus={(e) =>
                        e.currentTarget.removeAttribute("readonly")
                      }
                    />
                    <FormInput name="password" label="Heslo" type="password" />
                    <FormInput
                      name="verifyPassword"
                      label="Potvrzení hesla"
                      type="password"
                      readOnly
                      onFocus={(e) =>
                        e.currentTarget.removeAttribute("readonly")
                      }
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
