import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import Entry from '../../components/Entry/Entry';
import useGetEntriesOnMount from '../../services/useGetEntriesOnMount';
import NavHeader from '../../components/NavHeader';
import { makeStyles } from '@material-ui/core';
import ErrorText from '../../components/ErrorText';
import Logo from '../../components/Logo';
import HomeNav from './components/HomeNav';
import HideOnScroll from '../../components/HideOnScroll';
import AppBar from '@material-ui/core/AppBar';
import HomeHeader from './components/HomeHeader';

type Props = RouteComponentProps<{
  location: {
    state?: {
      id: string;
    };
  };
}>;

const useStyles = makeStyles({
  entriesRoot: {
    marginTop: 80,
    // overflow: 'scroll',
    // height: 'calc(100vh - 60px - 56px)',
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
    <>
      {/* <HideOnScroll> */}
      {/* <AppBar elevation={5}>
        <NavHeader>
          <Logo />
          <HomeNav />
        </NavHeader>
      </AppBar> */}
      <HomeHeader>
        <Logo />
        <HomeNav />
      </HomeHeader>
      {/* </HideOnScroll> */}
      <div className={classes.entriesRoot}>
        {entries.data && entries.data.map(entry => <Entry key={entry.id} entry={entry} />)}
        {entries.error && <ErrorText errorMessage={entries.error.message} />}
      </div>
    </>
  );
}
