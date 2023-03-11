import { PropsWithChildren } from "react";
import { HorizontalStack } from "@/ui";
import Image, { StaticImageData } from "next/image";

interface ImageDividerLayoutProps extends PropsWithChildren {
  image: StaticImageData | string;
  alt: string;
}

export const ImageDividerLayout = ({
  image,
  alt,
  children,
}: ImageDividerLayoutProps) => {
  return (
    <HorizontalStack className="h-full">
      <div className="relative hidden flex-1 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-main-yellow before:to-main-orange before:opacity-50 before:content-[''] lg:block">
        <Image
          className="z-negative object-cover object-left"
          src={image}
          fill
          alt={alt}
        />
      </div>
      {children}
    </HorizontalStack>
  );
};
