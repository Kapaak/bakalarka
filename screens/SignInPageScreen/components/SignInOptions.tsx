import { Button, HorizontalStack } from "@/ui";
import { FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";

export const SignInOptions = () => {
  return (
    <HorizontalStack className="justify-between gap-4 ">
      <Button
        className="flex flex-1 items-center justify-center gap-2 border-main-orange"
        variant="outlined"
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: `/`,
          })
        }
      >
        <GoogleLogo size={20} weight="bold" />
        <span>Google</span>
      </Button>
      <Button
        className="flex items-center gap-2 border-main-orange"
        variant="outlined"
        onClick={() => signIn("facebook")}
      >
        <FacebookLogo size={20} weight="bold" />
      </Button>
      <Button
        className="flex items-center gap-2 border-main-orange"
        variant="outlined"
        onClick={() => signIn("github")}
      >
        <GithubLogo size={20} weight="bold" />
      </Button>
    </HorizontalStack>
  );
};
