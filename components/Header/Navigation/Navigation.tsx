import { Button, IconButton, Link, User } from "@/ui";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { List } from "phosphor-react";
import { useState } from "react";
import { MobileBurgerMenu } from "./MobileBurgerMenu";
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <nav className="">
      <ul className="hidden items-center gap-8 lg:flex">
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
      </ul>

      <IconButton
        icon={<List size={40} />}
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      />
      <MobileBurgerMenu isOpen={isOpen} onClose={handleClose} />
    </nav>
  );
};
