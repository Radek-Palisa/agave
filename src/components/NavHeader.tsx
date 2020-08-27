import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, { noMargin?: boolean }>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: theme.spacing(1, 2),
    marginBottom: ({ noMargin }) => (noMargin ? 0 : theme.spacing(2)),
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 2px 4px rgba(0, 0, 0, .13)',
  },
}));

type Props = {
  children: React.ReactNode;
  noMargin?: boolean;
};

export default function NavHeader({ children, noMargin }: Props) {
  const classes = useStyles({ noMargin });

  return <div className={classes.root}>{children}</div>;
}
