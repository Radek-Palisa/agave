import { RouteComponentProps } from '@reach/router';
import React from 'react';
import store from '../store';
import Editor from './Editor/Editor';
import { PostEntryPayload } from '../types';
import { useError } from '../providers/ErrorProvider';
import { ROUTES } from '../consts';

export default function AddEntry({ navigate }: RouteComponentProps) {
  const [, setError] = useError();

  function handleSubmit(payload: PostEntryPayload) {
    if (!navigate) return;

    store.backup = null;

    navigate(ROUTES.HOME);

    if (!payload.title && !payload.text) {
      return;
    }

    store.addEntry(payload).catch(error => {
      setError({
        message: `There's been a problem while saving the entry.`,
        additionalInfo: error.message,
      });
      store.backup = payload;
      navigate(ROUTES.ADD_ENTRY, { state: payload });
    });
  }

  return (
    <Editor backLinkProps={{ to: ROUTES.HOME }} navTitle="Add Entry" onSubmit={handleSubmit} />
  );
}
