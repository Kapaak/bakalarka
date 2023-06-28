import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { Button, IconButton, Link, UserComponent } from "@/ui";
import { List } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

import { MobileBurgerMenu } from "./MobileBurgerMenu";
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="">
      <ul className="hidden items-center gap-8 lg:flex">
        <Link variant="underlined" href="/" onClick={handleClose}>
          domů
        </Link>
        <Link variant="underlined" href="/locations" onClick={handleClose}>
          trasy
        </Link>
        {/* <Link variant="underlined" href="/contact" onClick={handleClose}>
          kontakt
        </Link> */}
        {!session && (
          <Button onClick={() => router.push("/sign-in")}>Přihlásit se</Button>
        )}
        {session && session?.user?.name && (
          <UserComponent userName={session?.user?.name} />
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
