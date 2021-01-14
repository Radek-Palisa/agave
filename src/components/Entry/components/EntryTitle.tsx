import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  entryTitleRoot: {
    margin: '0 0 10px',
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function EntryTitle({ children }: Props) {
  const classes = useStyles();
  return (
    <Typography variant="h1" className={classes.entryTitleRoot}>
      {children || 'Recently'}
    </Typography>
  );
}
