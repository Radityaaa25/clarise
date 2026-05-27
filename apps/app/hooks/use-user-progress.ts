import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUserProgress(courseId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    courseId ? `/api/progress?courseId=${courseId}` : null,
    fetcher
  );

  const markComplete = async (moduleId: string) => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, courseId }),
      });
      const result = await res.json();
      if (res.ok) {
        mutate(); // Re-fetch the progress
      }
      return result;
    } catch (err) {
      console.error("Failed to mark progress:", err);
      throw err;
    }
  };

  return {
    progress: data,
    isLoading,
    isError: error,
    markComplete,
  };
}
