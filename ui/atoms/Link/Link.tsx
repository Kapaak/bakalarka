import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { PropsWithChildren } from "react";

import { cva, VariantProps } from "class-variance-authority";

const linkVariant = cva(["relative"], {
  variants: {
    color: {
      primary: [""],
      secondary: ["text-main-orange", "font-bold"],
    },

    variant: {
      plain: "",
      underlined:
        "before:duration-300 before:absolute before:-bottom-1 before:h-1 before:w-0 before:bg-black before:transition-all before:content-[''] hover:before:w-full ",
    },
  },
  defaultVariants: {
    color: "primary",
    variant: "plain",
  },
});

export type LinkProps = React.LinkHTMLAttributes<HTMLLinkElement> &
  VariantProps<typeof linkVariant> &
  NextLinkProps;

export const Link = ({
  href,
  className,
  children,
  color,
  variant,
}: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink
      className={linkVariant({ color, variant, className })}
      href={href}
    >
      {children}
    </NextLink>
  );
};
