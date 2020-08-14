import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, Button, Divider } from '@material-ui/core';
import { useError } from '../providers/ErrorProvider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    backgroundColor: theme.palette.error.light,
  },
  dialogContent: {
    padding: theme.spacing(3, 2, 2),

    '& > * + *': {
      marginTop: theme.spacing(4),
    },
  },
  message: {},
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
          <br />
          <HighlightOffIcon fontSize="large" />
          <br />
          Oh snap!
          <br />
          <br />
        </Typography>
      </DialogTitle>
      <div className={classes.dialogContent}>
        <Typography className={classes.message} align="center">
          {error?.message || 'Something went wrong.'}
        </Typography>
        {error?.additionalInfo && (
          <div>
            <Typography variant="caption">
              Additional info:
              <br />
              {error.additionalInfo}
            </Typography>
          </div>
        )}
      </div>
      <DialogActions>
        <Button>Dismiss</Button>
      </DialogActions>
    </Dialog>
  );
}
