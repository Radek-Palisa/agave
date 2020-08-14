import { RouteComponentProps } from '@reach/router';
import React from 'react';
import store from '../store';
import Editor from './Editor/Editor';
import { PostEntryPayload, Entry } from '../types';
import { useError } from '../providers/ErrorProvider';

type Props = RouteComponentProps<{
  location: {
    state: Entry;
  };
}>;

export default function AddEntry({ location, navigate }: Props) {
  const [, setError] = useError();

  function handleSubmit(payload: PostEntryPayload) {
    store.addEntry(payload).catch(error => {
      setError({
        message: `There's been a problem while saving the entry.`,
        additionalInfo: error.message,
      });
    });
    navigate && navigate('/');
  }

  return (
    <Editor
      backLinkProps={{ to: '/' }}
      navTitle="Add Entry"
      submitBtnText="Save"
      onSubmit={handleSubmit}
      entryData={location?.state ? { text: location.state.text } : undefined}
    />
  );
}
