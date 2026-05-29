import useSWR from "swr";
import { Difficulty } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseCoursesProps {
  category?: string | null;
  difficulty?: Difficulty | null;
  search?: string | null;
  cursor?: string | null;
  limit?: number;
}

export function useCourses({
  category,
  difficulty,
  search,
  cursor,
  limit = 12,
}: UseCoursesProps = {}) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (difficulty) params.append("difficulty", difficulty);
  if (search) params.append("search", search);
  if (cursor) params.append("cursor", cursor);
  params.append("limit", limit.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/courses?${params.toString()}`,
    fetcher,
  );

  return {
    courses: data?.courses,
    nextCursor: data?.nextCursor,
    total: data?.total,
    isLoading,
    isError: error,
    mutate,
  };
}
