import { useState, useEffect } from 'react';
import firebaseApp from 'firebase/app';
import { useAuth } from '../providers/AuthProvider';
import store from '../store';

export default function useGetEntriesOnMount() {
  const authStatus = useAuth();

  const [state, setState] = useState<{
    data: firebaseApp.firestore.QueryDocumentSnapshot<firebaseApp.firestore.DocumentData>[] | null;
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
