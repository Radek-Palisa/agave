import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#F4E7D3',
    boxShadow: '0 2px 4px rgba(0, 0, 0, .13)',
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function NavHeader({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}
