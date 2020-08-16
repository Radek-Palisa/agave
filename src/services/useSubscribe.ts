import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

type FetcherCallback = (error: Error | null, data?: any) => void;

export default function useSubscribe<T>(fetcher: (cb: FetcherCallback) => void) {
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

    fetcher((error, data) => {
      if (error) {
        setState({
          data: null,
          loading: false,
          error,
        });
      }
      setState({
        data,
        loading: false,
        error: null,
      });
    });
  }, [authStatus]);

  return state;
}
