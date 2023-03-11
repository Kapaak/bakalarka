import { HorizontalStack, IconButton } from "@/ui";
import { Heart } from "phosphor-react";

interface LikeBarProps {
  liked?: boolean;
  likesNumber: number;
}

export const LikeBar = ({ liked, likesNumber }: LikeBarProps) => {
  return (
    <HorizontalStack className="items-center justify-end gap-2">
      <p>{likesNumber}</p>
      <IconButton
        icon={
          <Heart className="text-main-red" weight={liked ? "fill" : "bold"} />
        }
      />
    </HorizontalStack>
  );
};
