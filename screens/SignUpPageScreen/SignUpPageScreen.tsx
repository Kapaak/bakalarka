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
  Text,
  TextAction,
  VerticalStack,
} from "@/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignUpPageScreen = () => {
  const { registerUser, isLoading } = useRegisterUser();

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Heslo by mělo mít alespoň 6 znaků."),
    verifyPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Hesla se neshodují."),
  });

  const form = useForm<SignUpFormModel>({
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

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
                    <FormInput name="name" label="Jméno" required />
                    <FormInput
                      name="email"
                      label="E-mail"
                      type="email"
                      //to remove autocomplete in chrome
                      readOnly
                      onFocus={(e) =>
                        e.currentTarget.removeAttribute("readonly")
                      }
                      required
                    />
                    <FormInput
                      name="password"
                      label="Heslo"
                      type="password"
                      required
                    />
                    <FormInput
                      name="verifyPassword"
                      label="Potvrzení hesla"
                      type="password"
                      readOnly
                      onFocus={(e) =>
                        e.currentTarget.removeAttribute("readonly")
                      }
                      required
                    />
                    <Text size="small" color="danger">
                      {errors.verifyPassword?.message}
                    </Text>
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
