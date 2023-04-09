import { GetServerSideProps, NextPage } from "next";
import { LocationPageScreen } from "@/screens";
import { locations } from "@/utils";
import { AutocompleteOption } from "@/domains";

interface LocationPageProps {
  location: AutocompleteOption;
}

export const LocationPage: NextPage<LocationPageProps> = ({ location }) => {
  return (
    <LocationPageScreen
      locationName={location?.label}
      locationValue={location?.value}
    />
  );
};

export const getServerSideProps: GetServerSideProps<{
  location?: AutocompleteOption;
}> = async (ctx) => {
  const { locationId } = ctx.query;

  const locationByValue = locations.find(
    (location) => location?.value === locationId
  );

  if (!locationByValue) return { notFound: true };

  return {
    props: {
      location: locationByValue,
    },
  };
};

export default LocationPage;
