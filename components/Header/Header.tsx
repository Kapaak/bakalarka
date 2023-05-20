import { Logo, MaxWidth } from "@/ui";

import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="py-6">
      <MaxWidth>
        <div className="flex justify-between">
          <Logo />
          <Navigation />
        </div>
      </MaxWidth>
    </header>
  );
};
