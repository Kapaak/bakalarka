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
  IconButton,
} from "@/ui";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormModel } from "@/domains";
import { FacebookLogo, GithubLogo, GoogleLogo } from "phosphor-react";
import { signIn } from "next-auth/react";

export const SignInPageScreen = () => {
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
            className="z-negative object-cover object-left"
            src="/images/girls-on-ride.jpg"
            fill
            alt="Two girls riding a bike."
          />
        </div>

        <MaxWidth className="flex-1">
          <Container height="full" place="center">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="w-[27rem]">
                <MainHeadline className="mb-20 text-center font-bold">
                  Rádi tě opět vidíme!
                </MainHeadline>
                <VerticalStack className="mx-auto w-full gap-6">
                  <FormInput name="email" label="E-mail" />
                  <FormInput name="password" label="Heslo" />
                </VerticalStack>
                <HorizontalStack className="mt-20 items-center">
                  <HorizontalStack className="gap-2">
                    <p>Ještě nemáš účet?</p>
                    <Link color="secondary" href="/sign-up">
                      Registruj se
                    </Link>
                  </HorizontalStack>
                  <Button color="secondary" className="ml-auto">
                    Vytvořit účet
                  </Button>
                </HorizontalStack>
                <br />
                <hr />
                <br />
                <HorizontalStack className=" justify-between gap-2 py-2 ">
                  <Button
                    className="flex  items-center gap-2"
                    onClick={() => signIn("google")}
                  >
                    <GoogleLogo size={20} weight="bold" />
                    <span>Google</span>
                  </Button>
                  <Button
                    className="flex  items-center gap-2"
                    onClick={() => signIn("facebook")}
                  >
                    <FacebookLogo size={20} weight="bold" />
                    <span>Facebook</span>
                  </Button>
                  <Button
                    className="flex  items-center gap-2"
                    onClick={() => signIn("github")}
                  >
                    <GithubLogo size={20} weight="bold" />
                    <span>GitHub</span>
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
