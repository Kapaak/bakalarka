import { GetServerSideProps, NextPage } from "next";

import { AutocompleteOption } from "@/domains";
import { LocationPageScreen } from "@/screens";
import { locations } from "@/utils";

interface LocationPageProps {
  location: AutocompleteOption;
}

export const LocationPage: NextPage<LocationPageProps> = ({ location }) => {
  return <LocationPageScreen locationName={location?.label} />;
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
