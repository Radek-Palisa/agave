import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export default function useQuery<T>(fetcher: () => Promise<T>) {
  const authStatus = useAuth();

  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: null | Error;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (authStatus === 'loading') {
      return;
    }

    fetcher()
      .then(data =>
        setState({
          data,
          loading: false,
          error: null,
        })
      )
      .catch(error =>
        setState({
          data: null,
          loading: false,
          error,
        })
      );
  }, [authStatus]);

  return state;
}
