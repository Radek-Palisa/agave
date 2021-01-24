import React, { useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import Markdown from '../../components/Markdown';
import AppHeader from '../../components/AppHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DetailNav } from './components/DetailNav';
import { Entry } from '../../types';
import DetailDateTitle from './components/DetailDateTitle';
import { ROUTES } from '../../consts';
import { IconButton, makeStyles } from '@material-ui/core';
import EntryTitle from '../../components/Entry/components/EntryTitle';
import EntryTimestamp from '../../components/Entry/components/EntryTimestamp';
import PageWidth from '../../components/PageWidth';
import store from '../../store';

const useStyles = makeStyles(theme => ({
  detailRoot: {
    padding: '80px 20px 50vh',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2, 1, 1),
    marginBottom: 20,
  },
}));

export default function Detail(props: RouteComponentProps) {
  const classes = useStyles();
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    store.getCurrentEntry().then(setEntry);
  }, []);

  const handleEntryDelete = () => {
    if (entry?.id) {
      store.deleteEntry(entry?.id);
    }
  };

  return (
    <PageWidth>
      <AppHeader>
        <IconButton
          onClick={() => {
            navigate(ROUTES.HOME, { state: { id: entry?.id } });
          }}
          color="primary"
          aria-label="add entry"
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <DetailDateTitle date={location?.state?.date} /> */}
        <DetailNav onEntryDelete={handleEntryDelete} />
      </AppHeader>
      <div className={classes.detailRoot}>
        {entry && (
          <>
            <EntryTitle>{entry.title}</EntryTitle>
            <EntryTimestamp>
              {entry.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </EntryTimestamp>
            <Markdown text={entry.text || ''} />
          </>
        )}
      </div>
    </PageWidth>
  );
}
