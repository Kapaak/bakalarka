import { Button, Link, User } from "@/ui";
import { signIn, signOut, useSession } from "next-auth/react";
export const Navigation = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex place-items-center gap-8">
      <Link href="/">domů</Link>
      <Link href="/locations">trasy</Link>
      <Link href="/contact">kontakt</Link>
      {/* //todo v signIn("google") aby slo prihlasit se, FYI */}
      {!session && <Button onClick={() => signIn()}>Přihlásit se</Button>}
      {session && session?.user?.name && (
        <User userName={session?.user?.name} />
      )}
      {session && <Button onClick={() => signOut()}>Odhlásit se</Button>}
    </nav>
  );
};
