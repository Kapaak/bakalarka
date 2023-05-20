import { TextAction, VerticalStack } from "@/ui";

export const SignInPanel = () => {
  return (
    <VerticalStack className="gap-2">
      <TextAction
        text="Ještě nemáš účet?"
        action="Registruj se"
        href="/sign-up"
      />

      <TextAction
        text="Zapomněli jste účet?"
        action="Nové heslo"
        href="/new-password"
      />
    </VerticalStack>
  );
};
