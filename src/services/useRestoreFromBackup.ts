import { useEffect } from 'react';
import { navigate } from '@reach/router';
import store from '../store';

export default function useRestoreFromBackup() {
  useEffect(() => {
    const backup = store.backup;

    if (backup?.pathname) {
      navigate(backup.pathname, {
        state: backup,
      });
    }
  }, []);
}
