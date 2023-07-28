import { Text } from "@/ui";
import { RoundedStar, Rating as SmastromRating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

interface RatingProps {
  rating: number;
  className?: string;
  label?: string;
  alreadyVoted?: boolean;
  onChange?: (value: number) => void;
}

export const Rating = ({
  rating,
  className,
  label,
  alreadyVoted,
  onChange,
}: RatingProps) => {
  const handleOnChange = (value: number) => {
    onChange && onChange(value);
  };

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <Text color="gray" size="small" className="pr-2">
        {label}
      </Text>

      <SmastromRating
        value={rating}
        onChange={handleOnChange}
        items={5}
        readOnly={alreadyVoted}
        itemStyles={{
          itemShapes: RoundedStar,
          activeFillColor: "#11111",
          inactiveStrokeColor: "black",
          itemStrokeWidth: 1,
        }}
        style={{
          width: "9rem",
        }}
      />
    </div>
  );
};
