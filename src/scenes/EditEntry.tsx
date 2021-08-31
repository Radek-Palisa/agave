import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Editor from './Editor/Editor';
// import store from '../store';
// import { useError } from '../providers/ErrorProvider';
// import { ROUTES } from '../consts';
import { useCurrentEntry } from '../providers/CurrentEntryProvider';

export default function EditEntry(_: RouteComponentProps) {
  // const [, setError] = useError();
  const { data, isLoading, saveEntryRemotely } = useCurrentEntry();

  // useEffect(() => {
  //   return () => {
  //     if (!navigate) return;

  //     saveEntryRemotely(store.editEntry).catch(error => {
  //       setError({
  //         message: `There's been a problem while saving the entry.`,
  //         additionalInfo: error.message,
  //       });

  //       // By the time this error manifests, the user has already been
  //       // redirected away from the edit entry page, so navigate them
  //       // back so that they can re-try
  //       if (error._entryId) {
  //         navigate(ROUTES.getEntryEditPath(error._entryId));
  //       }
  //     });
  //   };
  // }, []);

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
      onChange={saveEntryRemotely}
    />
  );
}
