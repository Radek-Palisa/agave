import React, { useState } from 'react';
import { Link } from '@reach/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import NavHeader from '../../components/NavHeader';
import Markdown from '../../components/Markdown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { PostEntryPayload, Entry } from '../../types';
import ErrorText from '../../components/ErrorText';
import TextField from '@material-ui/core/TextField';

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
  onSubmit: (payload: PostEntryPayload) => Promise<void>;
  entryData?: Entry;
};

export default function Editor({
  backLinkProps,
  navTitle,
  submitBtnText,
  onSubmit,
  entryData,
}: Props) {
  const classes = useStyles();
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [text, setText] = useState(entryData?.text || '');
  const [date, setDate] = useState(entryData?.date.toISOString().substring(0, 10));
  const [time, setTime] = useState(entryData?.date.toISOString().substring(11, 16));
  const [error, setError] = useState<Error | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    setSubmitting(true);
    onSubmit({ text }).catch(error => {
      setSubmitting(false);
      setError(error);
    });
  }

  return (
    <>
      <NavHeader>
        <Link {...backLinkProps}>
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
        <LoadingButton fullWidth pending={submitting} variant="contained" onClick={handleSubmit}>
          {submitBtnText}
        </LoadingButton>
        {error && <ErrorText errorMessage={error?.message} />}
      </section>
    </>
  );
}
