import { Button, Link, User } from "@/ui";
export const Navigation = () => {
  return (
    <nav className="flex place-items-center gap-8">
      <Link href="/">domů</Link>
      <Link href="/locations">trasy</Link>
      <Link href="/contact">kontakt</Link>
      <Button>Přihlásit se</Button>
      {/* <User userName="xoxo" /> */}
    </nav>
  );
};
