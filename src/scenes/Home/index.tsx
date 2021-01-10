import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import Entry from '../../components/Entry/Entry';
import useGetEntriesOnMount from '../../services/useGetEntriesOnMount';
import NavHeader from '../../components/NavHeader';
import { makeStyles } from '@material-ui/core';
import ErrorText from '../../components/ErrorText';
import Logo from '../../components/Logo';
import HomeNav from './components/HomeNav';

type Props = RouteComponentProps<{
  location: {
    state?: {
      id: string;
    };
  };
}>;

const useStyles = makeStyles({
  entriesRoot: {
    overflow: 'scroll',
    height: 'calc(100vh - 60px - 56px)',
  },
});

export default function Home({ location }: Props) {
  const classes = useStyles();
  const entries = useGetEntriesOnMount();
  const locationState = location?.state;

  useEffect(() => {
    if (entries.data && locationState?.id) {
      const element = document.getElementById(locationState.id);
      element?.scrollIntoView();
    }
  }, [entries, locationState]);

  return (
    <div className="page">
      <NavHeader>
        <Logo />
        <HomeNav />
      </NavHeader>
      <div className={classes.entriesRoot}>
        {entries.data && entries.data.map(entry => <Entry key={entry.id} entry={entry} />)}
        {entries.error && <ErrorText errorMessage={entries.error.message} />}
      </div>
    </div>
  );
}
