import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Editor from './Editor/Editor';
import { useError } from '../providers/ErrorProvider';
import { useCurrentEntry } from '../providers/CurrentEntryProvider';
import { PostEntryPayload } from '../types';

export default function EditEntry(_: RouteComponentProps) {
  const [, setError] = useError();
  const { data, isLoading, saveEntryRemotely } = useCurrentEntry();

  const handleChange = (values: PostEntryPayload) => {
    return saveEntryRemotely(values).catch(error => {
      setError({
        message: `There's been a problem while saving the entry.`,
        additionalInfo: error.message,
      });
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <Editor
      backLinkProps={{ to: `/entry/${data.id}` }}
      navTitle="Edit Entry"
      initialValues={data}
      onChange={handleChange}
    />
  );
}
