import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import api from "./api";

interface Props extends UseQueryOptions {
  url: string;
}
const useQueryList = <T>({ url, ...rest }: Props) => {
  const query = useQuery({
    ...rest,
    queryFn: async (): Promise<T[]> => {
      const { data } = await api.get<T[]>(url);
      return data;
    },
    initialData: [],
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true,
  }) as UseQueryResult<T[], unknown>;
  return { ...query, data: query.data || [] };
};
export default useQueryList;
