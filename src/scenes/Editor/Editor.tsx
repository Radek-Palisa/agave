import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
} from '@material-ui/core';
import NavHeader from '../../components/NavHeader';
import Markdown from '../../components/Markdown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { PostEntryPayload, Entry } from '../../types';
import TextField from '@material-ui/core/TextField';
import useDebounce from '../../services/useDebounce';
import store from '../../store';

const useStyles = makeStyles(theme => ({
  root: {},
  section: {
    padding: theme.spacing(1),

    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  wrapperInner: {
    height: '60vh',
  },
  toggleWrapper: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  textarea: {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0,
    resize: 'none',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#fffcf8',
    padding: theme.spacing(2),
    ...theme.typography.body2,
  },
  dateWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  markdown: {
    padding: theme.spacing(2),
  },
  submit: {
    display: 'block',
  },
}));

type Props = {
  backLinkProps: {
    to: string;
    state?: Entry;
  };
  navTitle: string;
  submitBtnText: string;
  // onSubmit: (payload: PostEntryPayload) => Promise<void>;
  onSubmit: (payload: PostEntryPayload) => void;
  onUnmount?: (data: any) => void;
  entryData?: Partial<Entry>;
};

export default function Editor({
  backLinkProps,
  navTitle,
  submitBtnText,
  onSubmit,
  entryData,
  onUnmount,
}: Props) {
  const classes = useStyles();
  const [hasExitConfirmed, setHasExitConfirmed] = useState<boolean>(false);
  const [showExitModal, setShotExitmodal] = useState<boolean>(false);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [text, setText] = useState(entryData?.text || '');
  const [date, setDate] = useState(entryData?.date?.toISOString().substring(0, 10));
  const [time, setTime] = useState(entryData?.date?.toISOString().substring(11, 16));

  const debouncedText = useDebounce(text, 500);

  const handleSubmit = () => {
    store.backup = null;
    return onSubmit({ text });
  };

  const handleBackButton = (e: any) => {
    if (hasExitConfirmed) return;

    e.preventDefault();
    setShotExitmodal(true);
  };

  const handleCloseExitModal = () => setShotExitmodal(false);

  useEffect(() => {
    store.backup = {
      id: entryData?.id,
      text: debouncedText,
      date: `${date}T${time}`,
      pathname: window.location.pathname,
    };
  }, [debouncedText, time, date]);

  return (
    <>
      <NavHeader>
        <Link {...backLinkProps} onClick={handleBackButton}>
          <ArrowBackIcon />
        </Link>
        <span>{navTitle}</span>
        <span />
      </NavHeader>
      <section className={classes.section}>
        <div className={classes.toggleWrapper}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, value) => setMode(value)}
            aria-label="text alignment"
          >
            <ToggleButton value="write" aria-label="editing mode">
              <EditIcon />
            </ToggleButton>
            <ToggleButton value="preview" aria-label="preview mode">
              <VisibilityIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={classes.wrapperInner}>
          {mode === 'write' ? (
            <textarea
              className={classes.textarea}
              onChange={e => setText(e.target.value)}
              value={text}
            />
          ) : (
            <Markdown className={classes.markdown} text={text} />
          )}
        </div>
        {entryData?.date && (
          <div className={classes.dateWrapper}>
            <TextField
              variant="outlined"
              id="time"
              label="Time"
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <TextField
              variant="outlined"
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        )}
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {submitBtnText}
        </Button>
      </section>
      <Dialog
        open={showExitModal}
        onClose={handleCloseExitModal}
        fullWidth
        aria-labelledby="simple-dialog-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography align="center" component="h2" id="simple-dialog-title">
            <br />
            {/* <HighlightOffIcon fontSize="large" /> */}
            <br />
            Wait a second!
            <br />
            <br />
          </Typography>
        </DialogTitle>
        <Typography align="center">You are leaving unsaved data behind.</Typography>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseExitModal();
              navigate(backLinkProps.to, backLinkProps);
            }}
          >
            Leave anyway
          </Button>
          <Button onClick={handleCloseExitModal}>Stay</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
