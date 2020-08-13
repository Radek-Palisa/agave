import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Editor from './Editor/Editor';
import store from '../store';
import { PostEntryPayload, Entry } from '../types';
import ErrorText from '../components/ErrorText';

type Props = RouteComponentProps<{
  location: {
    state: Entry;
  };
}>;

export default function EditEntry({ location, navigate }: Props) {
  function handleSubmit(payload: PostEntryPayload) {
    store.editEntry(payload, location?.state.id || '');
    navigate &&
      navigate('/detail', {
        state: {
          text: payload.text,
          id: location?.state.id,
          date: location?.state.date,
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
