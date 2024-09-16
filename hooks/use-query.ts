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
