import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  entriesWrapper: {
    flexGrow: 1,

    '& > p:last-child': {
      borderBottom: 0,
    },
  },
  entry: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #F4E7D3',
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
      <Typography style={{ minWidth: '50px' }} variant="h6" align="center" component="h3">
        {day}
      </Typography>
      <div className={classes.entriesWrapper}>
        {entries.map(entry => (
          <Typography key={entry.id} className={classes.entry} variant="body2">
            {entry.text}
          </Typography>
        ))}
      </div>
    </div>
  );
}
