import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, Button } from '@material-ui/core';
import { useError } from '../providers/ErrorProvider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    backgroundColor: theme.palette.error.light,
  },
  message: {
    padding: theme.spacing(3, 2, 2),
  },
}));

export default function ErrorModal() {
  const classes = useStyles();
  const [error, setError] = useError();

  return (
    <Dialog
      open={Boolean(error)}
      fullWidth
      onClose={() => setError(null)}
      aria-labelledby="simple-dialog-title"
      aria-describedby="simple-modal-description"
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography align="center" component="h2" id="simple-dialog-title">
          <HighlightOffIcon fontSize="large" />
          <br />
          Oh snap!
        </Typography>
      </DialogTitle>
      <Typography className={classes.message} align="center">
        {error?.message || 'Something went wrong.'}
      </Typography>
      <DialogActions>
        <Button>Dismiss</Button>
      </DialogActions>
    </Dialog>
  );
}
