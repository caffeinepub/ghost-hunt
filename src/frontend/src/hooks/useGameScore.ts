import { useGetScore, useAddScore } from './useQueries';

export function useGameScore() {
  const { data: score, isLoading } = useGetScore();
  const addScoreMutation = useAddScore();

  const incrementScore = async (points: number) => {
    await addScoreMutation.mutateAsync(points);
  };

  return {
    score: score ? Number(score) : 0,
    isLoading,
    incrementScore,
  };
}
