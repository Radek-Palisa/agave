import { Entry } from '../types';

const LOCAL_STORAGE_BACKUP_KEY = 'entryBackup';

const isValidDate = (date: Date) => {
  return (
    date instanceof Date &&
    // @ts-ignore
    !isNaN(date)
  );
};

type BackupValue = Entry & { pathname: string };

function getBackup(): BackupValue | null {
  const item = window.localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);

  if (!item) return null;

  const parsed = JSON.parse(item);

  const { date, id, title, text, tags, pathname } = parsed;

  const maybeDate = new Date(date);

  const validDate = isValidDate(maybeDate) ? maybeDate : new Date();

  return {
    id,
    date: validDate,
    title: title || '',
    text: text || '',
    tags: tags || [],
    pathname,
  };
}

function setBackup(entry: BackupValue | null) {
  // schedule as a macrotask
  setTimeout(() => {
    if (!entry) {
      return window.localStorage.removeItem(LOCAL_STORAGE_BACKUP_KEY);
    }
    window.localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(entry));
  }, 0);
}

export default function useEntryLocalBackup() {
  return { getBackup, setBackup };
}
