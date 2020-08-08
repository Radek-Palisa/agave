import React, { useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import NavHeader from '../../components/NavHeader';
import store from '../../store';
import Markdown from '../../components/Markdown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  root: {},
  wrapper: {
    padding: theme.spacing(1),
  },
  wrapperInner: {
    height: '60vh',
    marginBottom: theme.spacing(2),
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
  markdown: {
    padding: theme.spacing(2),
  },
  submit: {
    display: 'block',
  },
}));

export default function AddEntry({ navigate }: RouteComponentProps) {
  const classes = useStyles();
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [text, setText] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    setSubmitting(true);
    store
      .addEntry({ text })
      .then(() => {
        navigate && navigate('/');
      })
      .catch(error => {
        setSubmitting(false);
        setError(error);
      });
  }

  return (
    <>
      <NavHeader>
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <span>Add Entry</span>
        <span />
      </NavHeader>
      <section className={classes.wrapper}>
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
        <LoadingButton fullWidth pending={submitting} variant="contained" onClick={handleSubmit}>
          Submit
        </LoadingButton>
        {error && (
          <Typography variant="caption" color="error">
            {error?.message || 'ups something went wrong'}
          </Typography>
        )}
      </section>
    </>
  );
}
