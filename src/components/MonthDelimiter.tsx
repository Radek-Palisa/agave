import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#F4E7D3',
  },
}));

type Props = {
  month: string;
  year: number;
};

export default function MonthDelimiter({ month, year }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption">{month}</Typography>
      <Typography variant="caption">{year}</Typography>
    </div>
  );
}
