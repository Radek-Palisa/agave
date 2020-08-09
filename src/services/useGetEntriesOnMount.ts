import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import store from '../store';
import { MonthEntries } from '../types';

export default function useGetEntriesOnMount() {
  const authStatus = useAuth();

  const [state, setState] = useState<{
    data: MonthEntries | null;
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

    store
      .getEntries()
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
