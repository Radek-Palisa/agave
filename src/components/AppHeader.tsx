import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PageWidth from './PageWidth';

const useStyles = makeStyles(theme => ({
  appHeaderRoot: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  elevated: {
    boxShadow: '0 1px 2px rgba(0, 0, 0, .12)',
  },
  appHeaderContainer: {
    height: theme.custom.appHeaderHeight,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function AppHeader({ children }: Props) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <header className={`${classes.appHeaderRoot} ${trigger ? classes.elevated : ''}`}>
      <PageWidth>
        <div className={classes.appHeaderContainer}>{children}</div>
      </PageWidth>
    </header>
  );
}
