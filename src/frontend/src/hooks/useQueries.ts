import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Score } from '../backend';

export function useGetScore() {
  const { actor, isFetching } = useActor();

  return useQuery<Score>({
    queryKey: ['score'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getScore();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (points: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addScore(BigInt(points));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
  });
}
