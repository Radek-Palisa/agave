import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import Editor from './Editor/Editor';
import store from '../store';
import { PostEntryPayload, Entry } from '../types';
import { useError } from '../providers/ErrorProvider';
import { ROUTES } from '../consts';

export default function EditEntry({ navigate }: RouteComponentProps) {
  const [, setError] = useError();
  const [entry, setEntry] = useState<Entry | null>();

  useEffect(() => {
    store.getCurrentEntry().then(setEntry);
  }, []);

  function handleSubmit(payload: PostEntryPayload) {
    if (!navigate) return;

    store.backup = null;

    const newState = {
      text: payload.text,
      id: entry?.id,
      date: payload.date,
      tags: payload.tags,
      title: payload.title,
    };

    navigate(ROUTES.DETAIL, { state: newState });

    store.editEntry(payload, entry?.id || '').catch(error => {
      setError({
        message: `There's been a problem while saving the entry.`,
        additionalInfo: error.message,
      });
      store.backup = newState;
      navigate(ROUTES.EDIT_ENTRY, { state: newState });
    });
  }

  if (!entry) return null;

  return (
    <Editor
      backLinkProps={{ to: ROUTES.DETAIL }}
      navTitle="Edit Entry"
      onSubmit={handleSubmit}
      entryData={entry}
    />
  );
}
