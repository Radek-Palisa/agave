import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  logo: {
    filter: 'opacity(0.8)',
  },
});

export default function Logo() {
  const classes = useStyles();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IconButton onClick={handleClick}>
      <img src="/agave.png" width="20px" className={classes.logo} />
    </IconButton>
  );
}
