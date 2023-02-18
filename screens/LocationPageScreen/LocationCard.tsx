interface LocationCardProps {
  title: string;
}

export const LocationCard = ({ title }: LocationCardProps) => {
  return (
    <div className="border border-red-500 px-4 py-2 shadow-md">
      <h3>{title}</h3>
    </div>
  );
};
