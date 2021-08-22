import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  entryTimestampRoot: {
    fontSize: 14,
    color: '#A6A6A6',
    margin: theme.spacing(0, 0, 3),
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function EntryTimestamp({ children }: Props) {
  const classes = useStyles();
  return <p className={classes.entryTimestampRoot}>{children}</p>;
}
