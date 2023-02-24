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
} from "@/ui";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormModel } from "@/domains";

export const SignUpScreen = () => {
  const form = useForm<SignUpFormModel>();

  const { handleSubmit } = form;

  const onSubmit = (formVals: SignUpFormModel) => {
    console.log(formVals, "form vals");
  };
  return (
    <section>
      <HorizontalStack className="h-full">
        <div className="relative flex-1 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-main-yellow before:to-main-orange before:opacity-50 before:content-['']">
          <Image
            className="z-[-1] object-cover object-left"
            src="/images/girls-on-ride.jpg"
            fill
            alt="Two girls riding a bike."
          />
        </div>

        <MaxWidth className="flex-1">
          <Container fullHeight centerXY>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="w-[26rem]">
                <MainHeadline className="mb-20 text-center font-bold">
                  Vítejte!
                </MainHeadline>
                <VerticalStack className="mx-auto w-full gap-6">
                  <FormInput name="name" label="Jméno" />
                  <FormInput name="email" label="E-mail" className="" />
                  <FormInput name="password" label="Heslo" />
                  <FormInput name="verifyPassword" label="Potvrzení hesla" />
                </VerticalStack>
                <HorizontalStack className="mt-20 items-center">
                  <HorizontalStack className="gap-2">
                    <p>Už máte účet?</p>
                    <Link href="/sign-in">Přihlásit se</Link>
                  </HorizontalStack>
                  <Button color="secondary" className="ml-auto">
                    Vytvořit účet
                  </Button>
                </HorizontalStack>
              </form>
            </FormProvider>
          </Container>
        </MaxWidth>
      </HorizontalStack>
    </section>
  );
};
