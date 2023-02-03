import { Button, User } from "@/ui";
export const Navigation = () => {
  return (
    <nav className="flex place-items-center gap-8">
      <p className="font-bold">domů</p>
      <p className="font-bold">trasy</p>
      <p className="font-bold">kontakt</p>
      <Button>Přihlásit se</Button>
      {/* <User userName="xoxo" /> */}
    </nav>
  );
};
