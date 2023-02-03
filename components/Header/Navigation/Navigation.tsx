import { Button, User } from "@/ui";
export const Navigation = () => {
  return (
    <nav className="flex place-items-center gap-8">
      <p>domů</p>
      <p>trasy</p>
      <p>kontakt</p>
      <Button>Přihlásit se</Button>
      {/* <User userName="xoxo" /> */}
    </nav>
  );
};
