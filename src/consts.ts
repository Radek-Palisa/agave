export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SETTINGS: '/settings',
  TAGS: '/tags',
  DETAIL: 'entry/:entryId',
  EDIT_ENTRY: '/entry/:entryId/edit',
  ADD_ENTRY: '/entry/add',
  getEntryDetailPath: (entryId: string) => `/entry/${entryId}`,
  getEntryEditPath: (entryId: string) => `/entry/${entryId}/edit`,
} as const;
