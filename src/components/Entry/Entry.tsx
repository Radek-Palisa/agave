import React from 'react';
import { makeStyles } from '@material-ui/core';
import { firestore } from 'firebase';
import Markdown from '../Markdown';
import { Link } from '@reach/router';
import { ROUTES } from '../../consts';
import EntryTimestamp from './components/EntryTimestamp';
import EntryTitle from './components/EntryTitle';
import store from '../../store';

const useStyles = makeStyles(theme => ({
  entryRoot: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(0, 2.5),
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

  const entryObject = {
    id: entry.id,
    text: entryData.text,
    date: entryData.timestamp.toDate(),
    tags: entryData.tags,
    title: entryData.title,
  };

  const handleClick = () => store.setCurrentEntry(entryObject);

  return (
    <div className={classes.entryRoot} id={entry.id}>
      <Link
        to={ROUTES.DETAIL}
        state={entryObject}
        onClick={handleClick}
        className={classes.entryLink}
      >
        <EntryTitle>{entryData.title}</EntryTitle>
        <EntryTimestamp>
          {entryObject.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </EntryTimestamp>
        <Markdown id={entry.id} text={entryObject.text} />
      </Link>
    </div>
  );
}
