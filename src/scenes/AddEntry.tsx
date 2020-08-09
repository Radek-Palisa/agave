import { RouteComponentProps } from '@reach/router';
import React from 'react';
import store from '../store';
import Editor from './Editor/Editor';
import { PostEntryPayload } from '../types';

export default function AddEntry({ navigate }: RouteComponentProps) {
  function handleSubmit(payload: PostEntryPayload) {
    return store.addEntry(payload).then(() => {
      navigate && navigate('/');
    });
  }

  return (
    <Editor
      backLinkProps={{ to: '/' }}
      navTitle="Add Entry"
      submitBtnText="Save"
      onSubmit={handleSubmit}
    />
  );
}
