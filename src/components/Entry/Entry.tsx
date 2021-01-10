import React from 'react';
import { makeStyles } from '@material-ui/core';
import { firestore } from 'firebase';
import Markdown from '../Markdown';
import { Link } from '@reach/router';
import { ROUTES } from '../../consts';
import EntryTimestamp from './components/EntryTimestamp';
import EntryTitle from './components/EntryTitle';

const useStyles = makeStyles(theme => ({
  entryRoot: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(0, 2),
  },
  entryLink: {
    display: 'block',
    // color: 'initial',
    color: 'inherit',
    textDecoration: 'initial',
    '-webkit-tap-highlight-color': 'transparent',
  },
}));

type Props = {
  entry: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
};

export default function Entry({ entry }: Props) {
  const classes = useStyles();

  const entryData = entry.data();

  return (
    <div className={classes.entryRoot}>
      <Link to={ROUTES.DETAIL} state={entry} className={classes.entryLink}>
        <EntryTitle>{entryData.title}</EntryTitle>
        <EntryTimestamp>
          {entryData.timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </EntryTimestamp>
        <Markdown id={entry.id} text={entryData.text} />
      </Link>
    </div>
  );
}
