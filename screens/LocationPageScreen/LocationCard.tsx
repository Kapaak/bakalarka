import { Heart } from "phosphor-react";
import { IconButton } from "ui/atoms";

interface LocationCardProps {
  title: string;
  liked?: boolean;
  likesNumber?: number;
}

export const LocationCard = ({
  title,
  liked,
  likesNumber = 32,
}: LocationCardProps) => {
  return (
    <div className="relative z-10 h-[320px] w-[276px] rounded-md border-8 border-[#ffeaae] bg-slate-300 px-4 py-2 shadow-md ">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-end gap-2">
          <p>{likesNumber}</p>
          <IconButton
            icon={
              <Heart
                className="text-main-red"
                weight={liked ? "fill" : "bold"}
              />
            }
          />
        </div>
        <h3>{title}</h3>
      </div>
    </div>
  );
};
