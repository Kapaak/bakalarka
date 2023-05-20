import NextLink from "next/link";

interface LocationCardProps {
  label: string;
  href: string;
}

export const LocationCard = ({ label, href }: LocationCardProps) => {
  return (
    <NextLink href={href}>
      <div className="flex h-30 items-center justify-center rounded-md shadow-regular transition-all hover:border hover:border-main-orange">
        <h2>{label}</h2>
      </div>
    </NextLink>
  );
};
