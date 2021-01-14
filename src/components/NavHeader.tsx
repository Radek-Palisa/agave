import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 1px 2px rgba(0, 0, 0, .12)',
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function NavHeader({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}
