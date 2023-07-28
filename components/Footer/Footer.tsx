import NextLink from "next/link";

import { Text } from "@/ui";

export const Footer = () => {
  return (
    <div className="absolute bottom-0 right-0 z-50 flex w-full justify-end bg-white px-8 pb-2 pt-2 md:px-14">
      <NextLink href="https://pavelzapletal.cz/">
        <Text className=" text-sm text-gray-400">
          &copy; Pavel Zapletal 2023
        </Text>
      </NextLink>
    </div>
  );
};
