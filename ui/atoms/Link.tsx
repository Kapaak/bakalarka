import { ClassName } from "@/domains";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { PropsWithChildren } from "react";

interface LinkProps extends NextLinkProps {
  className?: ClassName;
}

export const Link = ({
  href,
  className,
  children,
}: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink
      className={`relative before:absolute before:-bottom-1 before:h-1 before:w-0 before:bg-black before:transition-all before:content-[""] hover:before:w-full ${className}`}
      href={href}
    >
      {children}
    </NextLink>
  );
};
