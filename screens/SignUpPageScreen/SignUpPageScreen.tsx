import Image from "next/image";
import {
  Container,
  HorizontalStack,
  MainHeadline,
  MaxWidth,
  FormInput,
  Button,
  VerticalStack,
  Link,
  ImageDividerLayout,
} from "@/ui";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormModel } from "@/domains";

export const SignUpPageScreen = () => {
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
              <form onSubmit={handleSubmit(onSubmit)} className="w-[26rem]">
                <MainHeadline className="mb-20 text-center font-bold">
                  Vítejte!
                </MainHeadline>
                <VerticalStack className="mx-auto w-full gap-6">
                  <FormInput name="name" label="Jméno" />
                  <FormInput name="email" label="E-mail" />
                  <FormInput name="password" label="Heslo" />
                  <FormInput name="verifyPassword" label="Potvrzení hesla" />
                </VerticalStack>
                <HorizontalStack className="mt-20 items-center">
                  <HorizontalStack className="gap-2">
                    <p>Už máte účet?</p>
                    <Link color="secondary" href="/sign-in">
                      Přihlásit se
                    </Link>
                  </HorizontalStack>
                  <Button color="secondary" className="ml-auto">
                    Vytvořit účet
                  </Button>
                </HorizontalStack>
              </form>
            </FormProvider>
          </Container>
        </MaxWidth>
      </ImageDividerLayout>
    </section>
  );
};
