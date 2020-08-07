import React, { useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import NavHeader from '../../components/NavHeader';
import store from '../../store';

const useStyles = makeStyles(theme => ({
  root: {},
  wrapper: {
    padding: theme.spacing(1),
  },
  textarea: {
    display: 'block',
    width: '100%',
    marginBottom: theme.spacing(2),
    border: 0,
    resize: 'none',
    height: '60vh',
    backgroundColor: '#fffcf8',
    padding: theme.spacing(2),
    ...theme.typography.body2,
  },
  submit: {
    display: 'block',
  },
}));

export default function AddEntry({ navigate }: RouteComponentProps) {
  const classes = useStyles();
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
        <textarea
          className={classes.textarea}
          onChange={e => setText(e.target.value)}
          value={text}
        />
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
