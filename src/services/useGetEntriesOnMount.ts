import { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { useAuth } from '../providers/AuthProvider';
import store from '../store';
import { MonthEntries } from '../types';

export default function useGetEntriesOnMount() {
  const authStatus = useAuth();

  const [state, setState] = useState<{
    data: firestore.QueryDocumentSnapshot<firestore.DocumentData>[] | null;
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
      .then(data => {
        return setState({
          data,
          loading: false,
          error: null,
        });
      })
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
