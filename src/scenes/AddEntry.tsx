import { RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import store from '../store';
import Editor from './Editor/Editor';
import { Entry } from '../types';
import { useError } from '../providers/ErrorProvider';
import { ROUTES } from '../consts';
import { useCurrentEntry } from '../providers/CurrentEntryProvider';

const initialValues: Entry = {
  id: 'undefined',
  title: '',
  text: '',
  tags: [],
  date: new Date(),
};
export default function AddEntry({ navigate }: RouteComponentProps) {
  const {
    data,
    isLoading,
    saveEntryLocally,
    saveEntryRemotely,
    setCurrentEntry,
  } = useCurrentEntry();
  const [, setError] = useError();

  useEffect(() => {
    return () => {
      if (!navigate) return;

      saveEntryRemotely(async ({ id: _, ...values }: Entry) => {
        // TODO - this meh, re-work it
        // reset current entry on the component unmount
        setCurrentEntry(null);

        // when left blank, skip creating the entry
        if (!values.title && !values.text && values.tags.length === 0) {
          return;
        }

        store.addEntry(values);
      }).catch(error => {
        setError({
          message: `There's been a problem while saving the entry.`,
          additionalInfo: error.message,
        });

        // By the time this error manifests, the user has already been
        // redirected away from the add entry page, so navigate them
        // back so that they can re-try
        navigate(ROUTES.ADD_ENTRY);
      });
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Editor
      backLinkProps={{ to: ROUTES.HOME }}
      navTitle="Add Entry"
      initialValues={data || initialValues}
      onChange={saveEntryLocally}
    />
  );
}
