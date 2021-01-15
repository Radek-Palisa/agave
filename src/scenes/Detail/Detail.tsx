import React from 'react';
import { RouteComponentProps, Link, navigate } from '@reach/router';
import Markdown from '../../components/Markdown';
import AppHeader from '../../components/AppHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DetailMenu } from './components/DetailMenu';
import { Entry } from '../../types';
import DetailDateTitle from './components/DetailDateTitle';
import { ROUTES } from '../../consts';
import { IconButton, makeStyles } from '@material-ui/core';
import EntryTitle from '../../components/Entry/components/EntryTitle';
import EntryTimestamp from '../../components/Entry/components/EntryTimestamp';
import PageWidth from '../../components/PageWidth';

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

type Props = RouteComponentProps<{
  location: {
    state?: Entry;
  };
}>;

export default function Detail({ location }: Props) {
  const classes = useStyles();

  return (
    <PageWidth>
      <AppHeader>
        <IconButton
          onClick={() => {
            navigate(ROUTES.HOME, { state: { id: location?.state?.id } });
          }}
          color="primary"
          aria-label="add entry"
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <DetailDateTitle date={location?.state?.date} /> */}
        <DetailMenu itemData={location?.state} />
      </AppHeader>
      <div className={classes.detailRoot}>
        <EntryTitle>{location?.state?.title}</EntryTitle>
        <EntryTimestamp>
          {location?.state?.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </EntryTimestamp>
        <Markdown text={location?.state?.text || ''} />
      </div>
    </PageWidth>
  );
}
