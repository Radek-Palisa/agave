import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  logoRoot: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,

    '& > img': {
      filter: 'opacity(0.8)',
    },

    '& > span': {
      marginLeft: theme.spacing(1),
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontWeight: 500,
      fontSize: 16,
      marginTop: 2,
      color: theme.palette.text.primary,
    },
  },
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <div className={classes.logoRoot}>
      <img src="/agave.png" width="20px" />
      {/* <Typography variant="body1" component="span">
        Agave
      </Typography> */}
    </div>
  );
}
