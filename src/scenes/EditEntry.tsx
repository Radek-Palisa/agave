import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Editor from './Editor/Editor';
import store from '../store';
import { PostEntryPayload, Entry } from '../types';
import ErrorText from '../components/ErrorText';
import { useError } from '../providers/ErrorProvider';

type Props = RouteComponentProps<{
  location: {
    state: Entry;
  };
}>;

export default function EditEntry({ location, navigate }: Props) {
  const [, setError] = useError();

  function handleSubmit(payload: PostEntryPayload) {
    store.editEntry(payload, location?.state.id || '').catch(error => {
      setError({
        message: `There's been a problem while saving the entry.`,
        additionalInfo: error.message,
      });
    });
    navigate &&
      navigate('/detail', {
        state: {
          text: payload.text,
          id: location?.state.id,
          date: payload.date,
          tags: payload.tags,
          title: payload.title,
        },
      });
  }

  if (!location?.state) {
    return <ErrorText errorMessage="Missing data" />;
  }

  return (
    <Editor
      backLinkProps={{ to: '/detail', state: location?.state }}
      navTitle="Edit Entry"
      submitBtnText="Update"
      onSubmit={handleSubmit}
      entryData={location.state}
    />
  );
}
