// import { navigate } from '@reach/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import store from '../store';
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
  saveEntryRemotely: (values: PostEntryPayload) => Promise<void>;
  setCurrentEntry: (entry: Entry | null) => void;
};

const CurrentEntryContext = createContext<CurrentEntryContextValue>({
  ...initialState,
  saveEntryRemotely: () => Promise.resolve(),
  setCurrentEntry: () => undefined,
});

export default function CurrentEntryProvider({ children }: { children: ReactNode }) {
  const tempEntry = useRef<Entry | null>(null);
  const [query, setQuery] = useState<Query>(initialState);

  const entryId = query.data?.id;

  useEffect(() => {
    // if there's an id in the url, the user
    // has landed directly on the edit or detail page,
    // so get the data
    // TODO

    setQuery({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const saveEntryRemotely = useCallback(
    (values: PostEntryPayload) => {
      const updatedEntry = {
        ...values,
        id: entryId as string,
      };

      tempEntry.current = updatedEntry;

      // TODO this only relevant to Edit Entry
      // set it optimistically
      setQuery({
        data: tempEntry.current,
        isLoading: false,
        error: null,
      });

      return store.editEntry(updatedEntry);
    },
    [entryId]
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
