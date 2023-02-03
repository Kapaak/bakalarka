import { Button, User } from "@/ui";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="flex justify-between py-6 px-4">
      <h1>Logo</h1>
      <Navigation />
    </header>
  );
};
