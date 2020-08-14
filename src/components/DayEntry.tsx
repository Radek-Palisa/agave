import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Markdown from './Markdown';
import Divider from '@material-ui/core/Divider';
import { Link } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  day: {
    minWidth: '4rem',
  },
  entriesWrapper: {
    flexGrow: 1,
    paddingRight: theme.spacing(2),

    '& > p:last-child': {
      borderBottom: 0,
    },
  },
  entryLinkWrapper: {
    color: 'initial',
    textDecoration: 'initial',
    '-webkit-tap-highlight-color': 'transparent',
  },
  entry: {
    marginBottom: '0.875rem',
  },
  divider: {
    marginBottom: '0.875rem',
  },
}));

type Props = {
  entries: Array<{ text: string; id: string }>;
  day: number;
};

export default function DayEntry({ entries, day }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.day} variant="h6" align="center" component="h3">
        {day}
      </Typography>
      <div className={classes.entriesWrapper}>
        {entries.map((entry, index) => (
          <React.Fragment key={entry.id}>
            <Link to="detail" state={entry} className={classes.entryLinkWrapper}>
              <Markdown className={classes.entry} text={entry.text} />
            </Link>
            {index !== entries.length - 1 && <Divider className={classes.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
