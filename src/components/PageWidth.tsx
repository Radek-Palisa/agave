import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageWidthRoot: {
    maxWidth: 700,
    margin: '0 auto',
  },
});

type Props = {
  children: React.ReactNode;
};

export default function PageWidth({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.pageWidthRoot}>{children}</div>;
}
