import { navigationRoute } from "@/actions/navigationAction";
import { retrieveCoordinates } from "@/actions/retrieveAction";
import { searchAddress } from "@/actions/searchAction";
import { getAllTestData } from "@/actions/testAction";
import { useQuery } from "@tanstack/react-query";

export const QueryAllTestData = () => {
  return useQuery({
    queryKey: ["get-test"],
    queryFn: () => getAllTestData(),
  });
};

export const QuerySearchAddress = (value: string | null) => {
  return useQuery({
    queryKey: ["search-address " + value],
    queryFn: () => searchAddress(value),
    enabled: !!value,
  });
};

export const QueryRetrieveAddress = (value: string | null) => {
  return useQuery({
    queryKey: ["retrieve-address " + value],
    queryFn: () => retrieveCoordinates(value),
    enabled: !!value,
  });
};

type LocationType = {
  lat: number;
  long: number;
};

export const QueryNavigationRoute = (
  originAddress: LocationType | null,
  destinationAddress: LocationType | null
) => {
  return useQuery({
    queryKey: [
      "navigation-route " + originAddress?.lat + destinationAddress?.lat,
    ],
    queryFn: () => navigationRoute(originAddress, destinationAddress),
    enabled: !!originAddress?.lat && !!destinationAddress?.lat,
  });
};
