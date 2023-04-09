import { Button, IconButton, Link, User } from "@/ui";
import { X } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface MobileBurgerMenuProps {
  isOpen: boolean;
  onClose(): void;
}

export const MobileBurgerMenu = ({
  isOpen,
  onClose,
}: MobileBurgerMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div
      className={`${
        !isOpen ? "translate-x-full" : "translate-x-0"
      } border-green fixed left-0 top-0 z-20 flex h-full w-full flex-col items-end gap-10 border bg-main-yellow py-6  px-8 transition-all lg:hidden`}
    >
      <IconButton icon={<X size={40} />} onClick={onClose} />

      {!session && (
        <Button onClick={() => router.push("/sign-in")}>Přihlásit se</Button>
      )}
      {session && session?.user?.name && (
        <User userName={session?.user?.name} />
      )}
      <ul className="flex flex-col gap-6 text-right">
        <Link variant="underlined" href="/">
          domů
        </Link>
        <Link variant="underlined" href="/locations">
          trasy
        </Link>
        <Link variant="underlined" href="/contact">
          kontakt
        </Link>
      </ul>
    </div>
  );
};
