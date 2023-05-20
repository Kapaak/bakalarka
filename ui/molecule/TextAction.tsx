import { HorizontalStack, Link, Text } from "..";

interface TextActionProps {
  text: string;
  action: string;
  href: string;
}

export const TextAction = ({ action, href, text }: TextActionProps) => {
  return (
    <HorizontalStack className="gap-2">
      <Text className="font-light" size="small">
        {text}
      </Text>
      <Link href={href}>
        <Text color="secondary" size="small">
          {action}
        </Text>
      </Link>
    </HorizontalStack>
  );
};
