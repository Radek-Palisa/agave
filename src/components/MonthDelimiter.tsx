import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    fallbacks: [
      {
        display: '-webkit-sticky',
      },
    ],
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 1, 0.5, 0),
    marginBottom: theme.spacing(1),
    backgroundColor: '#F4E7D3',
    fontSize: 10,
    textTransform: 'lowercase',
    fontFamily: 'Montserrat',
    letterSpacing: 0.5,
    fontWeight: 700,
    color: '#A1988A',
  },
  month: {
    minWidth: '4rem',
    textAlign: 'center',
    padding: theme.spacing(0, 0.5),
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
      <span className={classes.month}>{month}</span>
      <span>{year}</span>
    </div>
  );
}
