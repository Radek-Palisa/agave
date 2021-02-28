export type Entry = {
  id: string;
  text: string;
  title: string;
  date: Date;
  tags: string[];
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
  title: string;
  tags: string[];
  date: Date;
};

export type Tag = {
  id: string;
  label: string;
};
