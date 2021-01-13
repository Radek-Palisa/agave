export type Entry = {
  text: string;
  title?: string;
  id: string;
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
