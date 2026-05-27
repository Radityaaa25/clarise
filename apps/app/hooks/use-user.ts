import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
