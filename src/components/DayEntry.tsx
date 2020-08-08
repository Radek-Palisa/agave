import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Markdown from './Markdown';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  entriesWrapper: {
    flexGrow: 1,
    paddingRight: theme.spacing(2),

    '& > p:last-child': {
      borderBottom: 0,
    },
  },
  entry: {
    marginBottom: '0.875rem',
    // borderBottom: '1px solid #F4E7D3',
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
      <Typography style={{ minWidth: '50px' }} variant="h6" align="center" component="h3">
        {day}
      </Typography>
      <div className={classes.entriesWrapper}>
        {entries.map((entry, index) => (
          <>
            <Markdown className={classes.entry} key={entry.id} text={entry.text} />
            {index !== entries.length - 1 && <Divider className={classes.divider} />}
          </>
        ))}
      </div>
    </div>
  );
}
