import { Logo, MaxWidth, User } from "@/ui";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="bg-main-yellow py-6 px-4">
      <MaxWidth>
        <div className="flex justify-between">
          <Logo />
          <Navigation />
        </div>
      </MaxWidth>
    </header>
  );
};
