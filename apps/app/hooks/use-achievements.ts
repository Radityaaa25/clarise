import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAchievements() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/achievements",
    fetcher
  );

  return {
    achievements: data?.badges || [],
    xpData: data?.xpData,
    isLoading,
    isError: error,
    mutate,
  };
}
