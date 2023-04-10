import { LatLngLiteral } from "@/domains";

export const locations = [
  { value: "olomoucky-kraj", label: "Olomoucký kraj" },
  { value: "jihomoravsky-kraj", label: "Jihomoravský kraj" },
  { value: "moravskoslezsky-kraj", label: "Moravskoslezský kraj" },
  { value: "zlinsky-kraj", label: "Zlínský kraj" },
  { value: "vysocina-kraj", label: "Kraj Vysočina" },
  { value: "pardubicky-kraj", label: "Pardubický kraj" },
  { value: "kralovehradecky-kraj", label: "Královehradecký kraj" },
  { value: "liberecky-kraj", label: "Liberecký kraj" },
  { value: "ustecky-kraj", label: "Ústecký kraj" },
  { value: "karlovarsky-kraj", label: "Karlovarský kraj" },
  { value: "plzensky-kraj", label: "Plzeňský kraj" },
  { value: "jihocesky-kraj", label: "Jihočeský kraj" },
  { value: "stredocesky-kraj", label: "Středočeský kraj" },
];

export const handleAddressFromCoordinates = async (location: LatLngLiteral) => {
  if (window?.google) {
    const geocoder = new google.maps.Geocoder();
    const data = await geocoder.geocode({ location });

    return data.results;
  }
  return [];
};
