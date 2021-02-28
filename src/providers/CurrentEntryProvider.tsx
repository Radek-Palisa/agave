import { navigate } from '@reach/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useEntryLocalBackup from '../services/useEntryLocalBackup';
import { Entry, PostEntryPayload } from '../types';

type Query = {
  data: Entry | null;
  isLoading: boolean;
  error: Error | null;
};

const initialState: Query = {
  data: null,
  isLoading: true,
  error: null,
};

type CurrentEntryContextValue = Query & {
  saveEntryLocally: (values: PostEntryPayload) => void;
  saveEntryRemotely: (saveMethod: (entry: Entry) => Promise<void>) => Promise<void>;
  setCurrentEntry: (entry: Entry | null) => void;
};

const CurrentEntryContext = createContext<CurrentEntryContextValue>({
  ...initialState,
  saveEntryLocally: () => undefined,
  saveEntryRemotely: () => Promise.resolve(),
  setCurrentEntry: () => undefined,
});

export default function CurrentEntryProvider({ children }: { children: ReactNode }) {
  const { getBackup, setBackup } = useEntryLocalBackup();
  const tempEntry = useRef<Entry | null>(null);
  const [query, setQuery] = useState<Query>(initialState);

  const entryId = query.data?.id;

  useEffect(() => {
    // When the page loads and there's backup, it most likely
    // means that the app has been closed before saving the latest
    // changes. Restore the session.

    const backup = getBackup();

    if (backup) {
      const { pathname, ...entry } = backup;

      setQuery({
        data: entry,
        isLoading: false,
        error: null,
      });

      navigate(pathname);
      return;
    }

    // if !backup but there's an id in the url, the user
    // has landed directly on the edit or detail page,
    // so get the data
    // TODO

    setQuery({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const saveEntryLocally = useCallback(
    (values: PostEntryPayload) => {
      const updatedEntry = {
        ...values,
        id: entryId as string,
      };

      tempEntry.current = updatedEntry;

      setBackup({
        ...updatedEntry,
        pathname: window.location.pathname,
      });
    },
    [entryId]
  );

  const saveEntryRemotely = useCallback(
    (saveMethod: (entry: Entry) => Promise<void>) => {
      // TODO
      // avoid saving when no changes have been made

      // TODO
      if (!tempEntry.current) return Promise.resolve();

      // TODO this only relevant to Edit Entry
      // set it optimistically
      setQuery({
        data: tempEntry.current,
        isLoading: false,
        error: null,
      });

      return saveMethod(tempEntry.current)
        .then(() => {
          tempEntry.current = null;
          setBackup(null);
        })
        .catch(error => {
          error._entryId = tempEntry.current?.id;
          throw error;
        });
    },
    [setQuery]
  );

  const setCurrentEntry = useCallback(
    (entry: Entry | null) =>
      setQuery({
        data: entry,
        isLoading: false,
        error: null,
      }),
    [setQuery]
  );

  const value: CurrentEntryContextValue = {
    saveEntryLocally,
    saveEntryRemotely,
    setCurrentEntry,
    ...query,
  };

  return (
    <div>
      <CurrentEntryContext.Provider value={value}>{children}</CurrentEntryContext.Provider>
    </div>
  );
}

export const useCurrentEntry = () => useContext(CurrentEntryContext);
