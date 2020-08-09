export type Entry = {
  text: string;
  id: string;
  date: Date;
};

export type MonthEntries = Array<{
  month: string;
  year: number;
  days: Array<{
    day: number;
    entries: Array<Entry>;
  }>;
}>;

export type PostEntryPayload = {
  text: string;
};
