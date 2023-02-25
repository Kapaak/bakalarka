import { Button, Link, User } from "@/ui";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="flex place-items-center gap-8">
      <Link variant="underlined" href="/">
        domů
      </Link>
      <Link variant="underlined" href="/locations">
        trasy
      </Link>
      <Link variant="underlined" href="/contact">
        kontakt
      </Link>
      {!session && (
        <Button onClick={() => router.push("/sign-in")}>Přihlásit se</Button>
      )}
      {session && session?.user?.name && (
        <User userName={session?.user?.name} />
      )}
    </nav>
  );
};
