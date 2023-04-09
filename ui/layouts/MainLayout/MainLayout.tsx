import { PropsWithChildren } from "react";

import { Header } from "@/components";
import { Karla } from "@next/font/google";

interface MainLayoutProps extends PropsWithChildren {}

const karla = Karla({ subsets: ["latin", "latin-ext"] });

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className={karla.className}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};
