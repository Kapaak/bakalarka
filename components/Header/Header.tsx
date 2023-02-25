import { Logo, MaxWidth } from "@/ui";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-main-yellow to-main-orange py-6 px-8">
      <MaxWidth>
        <div className="flex justify-between">
          <Logo />
          <Navigation />
        </div>
      </MaxWidth>
    </header>
  );
};
