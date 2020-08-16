import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles<Theme, { type: 'error' | 'info' }>(theme => ({
  root: {
    color: ({ type }) => (type === 'error' ? 'white' : 'initial'),
    backgroundColor: ({ type }) => (type === 'error' ? theme.palette.error.light : '#91daff'),
  },
  dialogContent: {
    padding: theme.spacing(3, 2, 2),

    '& > * + *': {
      marginTop: theme.spacing(4),
    },
  },
  message: {},
}));

type Props = {
  type?: 'error' | 'info';
  open: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
  additionalInfo?: React.ReactNode;
};

export default function Modal({
  type = 'info',
  open,
  onClose,
  icon,
  title,
  description,
  actions,
  additionalInfo,
}: Props) {
  const classes = useStyles({ type });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography align="center" component="h2" id="modal-title">
          <br />
          {icon}
          <br />
          {title}
          <br />
          <br />
        </Typography>
      </DialogTitle>
      <div className={classes.dialogContent}>
        <Typography align="center" id="modal-description">
          {description}
        </Typography>
        {additionalInfo}
      </div>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
