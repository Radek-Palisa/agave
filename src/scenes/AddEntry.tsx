import { RouteComponentProps } from '@reach/router';
import React from 'react';
import store from '../store';
import Editor from './Editor/Editor';
import { PostEntryPayload, Entry } from '../types';
import { useError } from '../providers/ErrorProvider';
import { ROUTES } from '../consts';

type Props = RouteComponentProps<{
  location: {
    state: Entry;
  };
}>;

export default function AddEntry({ location, navigate }: Props) {
  const [, setError] = useError();

  function handleSubmit(payload: PostEntryPayload) {
    if (!navigate) return;

    store.backup = null;

    if (!payload.title && !payload.text) {
      return navigate(ROUTES.HOME);
    }

    navigate(ROUTES.HOME);

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
    <Editor
      backLinkProps={{ to: ROUTES.HOME }}
      navTitle="Add Entry"
      submitBtnText="Save"
      onSubmit={handleSubmit}
      entryData={
        location?.state ? { text: location.state.text, title: location.state.title } : undefined
      }
    />
  );
}
