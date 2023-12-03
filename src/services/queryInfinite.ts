import {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import api from "./api";
import { useIntersection } from "../hooks/useIntersection";
import { IPaginatedResponse } from "../Interfaces/IPaginatedResponse";

interface Props extends UseInfiniteQueryOptions {
  url: string;
  limit?: number;
  search?: string;
}
const useQueryInfinite = <T>({ url, limit = 10, search, ...rest }: Props) => {
  const query = useInfiniteQuery({
    ...rest,
    queryFn: async ({ pageParam }): Promise<IPaginatedResponse<T>> => {
      const { data } = await api.get<IPaginatedResponse<T>>(url, {
        params: { page: pageParam, limit, search },
      });
      return data;
    },
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true,
    //     getNextPageParam: (param: IPaginatedResponse<T>) => {
    //       const totalPages = Math.ceil(param.total / limit);
    //       if (param.page < totalPages) {
    //         return param.page + 1;
    //       }
    //       return undefined;
    // };
    getNextPageParam: (param: any) => {
      const totalPages = Math.ceil(param.total / limit);
      if (param.page < totalPages) {
        return param.page + 1;
      }
      return undefined;
    },
  }) as UseInfiniteQueryResult<IPaginatedResponse<T>, unknown>;

  const data = (query.data?.pages || []).map((o) => o.results).flat() || [];
  const { ref } = useIntersection(() => {
    if (rest.enabled) {
      query.fetchNextPage();
    }
  });

  return { ...query, data: data || [], ref };
};
export default useQueryInfinite;
