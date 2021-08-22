import React from 'react';
import { Typography } from '@material-ui/core';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  entryTitleRoot: {
    margin: '0 0 10px',
  },
});

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
