import useQuery from '../../../services/useQuery';
import store from '../../../store';
import { useMemo } from 'react';

export default function useGetSortedTags(tags?: string[]) {
  const state = useQuery(store.getUserTags);

  return useMemo(() => {
    if (state.loading || !state.data || !tags) return state;

    return {
      data: [...state.data].sort((a, b) => {
        if (tags.includes(a.id) && !tags.includes(b.id)) {
          return -1;
        }
        if (!tags.includes(a.id) && tags.includes(b.id)) {
          return 1;
        }
        return 0;
      }),
      loading: false,
      error: null,
    };
  }, [state]);
}
