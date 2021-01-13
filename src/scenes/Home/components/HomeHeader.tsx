import React from 'react';
import { makeStyles } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.default,
    // boxShadow: '0 2px 4px rgba(0, 0, 0, .13)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  elevated: {
    boxShadow: '0 1px 6px rgba(0, 0, 0, .12)',
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function HomeHeader({ children }: Props) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return <div className={`${classes.root} ${trigger ? classes.elevated : ''}`}>{children}</div>;
}
