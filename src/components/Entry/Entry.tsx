import React from 'react';
import { makeStyles } from '@material-ui/core';
import Markdown from '../Markdown';
import { Link } from '@reach/router';
import { ROUTES } from '../../consts';
import EntryTimestamp from './components/EntryTimestamp';
import EntryTitle from './components/EntryTitle';
import { Entry as EntryType } from '../../types';

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
  entry: EntryType;
  onClick: () => void;
};

export default function Entry({ entry, onClick }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.entryRoot} id={entry.id}>
      <Link
        to={ROUTES.getEntryDetailPath(entry.id)}
        onClick={onClick}
        className={classes.entryLink}
      >
        <EntryTitle>{entry.title}</EntryTitle>
        <EntryTimestamp>
          {entry.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </EntryTimestamp>
        <Markdown id={entry.id} text={entry.text} />
      </Link>
    </div>
  );
}
