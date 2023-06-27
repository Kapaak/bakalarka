import NextLink from "next/link";

interface LocationCardProps {
  label: string;
  href: string;
  routesCount?: number;
}

export const LocationCard = ({
  label,
  href,
  routesCount,
}: LocationCardProps) => {
  return (
    <NextLink href={href}>
      <div className="flex h-30 flex-col items-center justify-center rounded-md shadow-regular transition-all hover:border hover:border-main-orange">
        <h2>{label}</h2>
        <p className="text-gray-500">Počet tras: {routesCount}</p>
      </div>
    </NextLink>
  );
};
