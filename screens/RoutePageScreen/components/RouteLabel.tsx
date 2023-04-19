import { Text } from "@/ui";

interface RouteLabelProps {
  title: string;
  description: string | number;
}

export const RouteLabel = ({ description, title }: RouteLabelProps) => {
  return (
    <div>
      <Text color="gray" size="small">
        {title}
      </Text>
      <Text className="ml-2 mt-1">{description}</Text>
    </div>
  );
};
