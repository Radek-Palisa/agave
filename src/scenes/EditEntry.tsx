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
    return store.editEntry(payload, location?.state.id || '').then(() => {
      navigate && navigate('/detail', { state: location?.state });
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
