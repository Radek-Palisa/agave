import React, { useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import Editor from './Editor/Editor';
import { Entry, PostEntryPayload } from '../types';
import { useError } from '../providers/ErrorProvider';
import { ROUTES } from '../consts';
import { useCurrentEntry } from '../providers/CurrentEntryProvider';
import store from '../store';

const initialValues: Entry = {
  id: 'undefined',
  title: '',
  text: '',
  tags: [],
  date: new Date(),
};
export default function AddEntry(_: RouteComponentProps) {
  const isCreated = useRef(false);
  const { data, isLoading, saveEntryRemotely, setCurrentEntry } = useCurrentEntry();
  const [, setError] = useError();

  const handleChange = (values: PostEntryPayload) => {
    if (!values.title && !values.text && values.tags.length === 0) {
      return Promise.resolve();
    }

    if (!isCreated.current) {
      isCreated.current = true;

      return store
        .addEntry(values)
        .then(res => {
          setCurrentEntry({
            id: res.id,
            ...values,
          });
        })
        .catch(error => {
          setError({
            message: `There's been a problem while saving the entry.`,
            additionalInfo: error.message,
          });
        });
    }

    return saveEntryRemotely(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Editor
      backLinkProps={{ to: ROUTES.HOME }}
      navTitle="Add Entry"
      initialValues={data || initialValues}
      onChange={handleChange}
    />
  );
}
