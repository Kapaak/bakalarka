import { Header, Footer } from "@/components";
import { PropsWithChildren } from "react";

interface MainLayoutProps extends PropsWithChildren {}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};
