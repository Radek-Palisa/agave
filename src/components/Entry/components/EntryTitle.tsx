import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  entryTitleRoot: {
    fontSize: 20,
    margin: '0 0 10px',
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function EntryTitle({ children }: Props) {
  const classes = useStyles();
  return <h1 className={classes.entryTitleRoot}>{children || 'Recently'}</h1>;
}
