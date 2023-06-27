import { NextPage } from "next";

import { Region } from "@/domains";
import { LocationsPageScreen } from "@/screens";
import { getAllRoutesPerLocation } from "prisma/route";

interface LocationsPageProps {
  regionsRoutesCount: Region;
}

const LocationsPage: NextPage<LocationsPageProps> = ({
  regionsRoutesCount,
}) => {
  return <LocationsPageScreen regionsRoutesCount={regionsRoutesCount} />;
};

export const getServerSideProps = async () => {
  const regionsRoutesCount = await getAllRoutesPerLocation();

  return {
    props: {
      regionsRoutesCount,
    },
  };
};

export default LocationsPage;
