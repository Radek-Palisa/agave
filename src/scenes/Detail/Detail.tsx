import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import EditIcon from '@material-ui/icons/Edit';
import Markdown from '../../components/Markdown';
import AppHeader from '../../components/AppHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DeleteEntry } from './components/DeleteEntry';
import { ROUTES } from '../../consts';
import { IconButton } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import EntryTitle from '../../components/Entry/components/EntryTitle';
import EntryTimestamp from '../../components/Entry/components/EntryTimestamp';
import PageWidth from '../../components/PageWidth';
import store from '../../store';
import { useCurrentEntry } from '../../providers/CurrentEntryProvider';

const useStyles = makeStyles(theme => ({
  detailRoot: {
    padding: '80px 20px 50vh',
    wordBreak: 'break-word',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2, 1, 1),
    marginBottom: 20,
  },
}));

export default function Detail(_: RouteComponentProps) {
  const classes = useStyles();
  const { data, isLoading, setCurrentEntry } = useCurrentEntry();

  if (isLoading) {
    return (
      <PageWidth>
        <p>loading</p>
      </PageWidth>
    );
  }

  if (!data) {
    return (
      <PageWidth>
        <p>Missing data</p>
      </PageWidth>
    );
  }

  const handleEntryDelete = () => {
    store.deleteEntry(data.id);
    setCurrentEntry(null);
    navigate(ROUTES.HOME);
  };

  const handleEditClick = () => {
    navigate(ROUTES.getEntryEditPath(data.id));
  };

  return (
    <PageWidth>
      <AppHeader>
        <IconButton
          onClick={() => {
            setCurrentEntry(null);
            // Browser doesn't automatically restore the scroll pos
            // when coming back from the detail page. Pass the
            // entry id to the homepage via Location state so that
            // it can use it to scroll to the element with the same html id.
            navigate(ROUTES.HOME, { state: { id: data.id } });
          }}
          color="primary"
          aria-label="add entry"
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <DeleteEntry onEntryDelete={handleEntryDelete} />
          <IconButton
            color="primary"
            aria-label="menu"
            aria-controls="detail-menu"
            aria-haspopup="true"
            onClick={handleEditClick}
            size="large"
          >
            <EditIcon />
          </IconButton>
        </div>
      </AppHeader>
      <div className={classes.detailRoot}>
        <EntryTitle>{data.title}</EntryTitle>
        <EntryTimestamp>
          {data.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </EntryTimestamp>
        <Markdown text={data.text || ''} />
      </div>
    </PageWidth>
  );
}
