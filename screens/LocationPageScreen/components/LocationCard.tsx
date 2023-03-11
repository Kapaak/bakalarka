import { useRouter } from "next/router";
import { Heart } from "phosphor-react";
import { HorizontalStack, IconButton, VerticalStack } from "ui/atoms";
import { LikeBar } from "./LikeBar";

interface LocationCardProps {
  title: string;
  liked?: boolean;
  likesNumber?: number;
  href: string;
}

export const LocationCard = ({
  title,
  liked,
  likesNumber = 32,
  href,
}: LocationCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(href)}
      className="relative z-10 rounded-md border-8 border-[#ffeaae] bg-slate-300 px-4 py-2 shadow-md lg:h-[320px] lg:min-w-[276px] "
    >
      <HorizontalStack className="h-full justify-between lg:flex-col-reverse">
        <h3>{title}</h3>
        <LikeBar liked={liked} likesNumber={likesNumber} />
      </HorizontalStack>
    </div>
  );
};
