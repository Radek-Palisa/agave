import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { makeStyles, Button, Chip } from '@material-ui/core';
import NavHeader from '../../components/NavHeader';
import Markdown from '../../components/Markdown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import { PostEntryPayload, Entry } from '../../types';
import TextField from '@material-ui/core/TextField';
import useDebounce from '../../services/useDebounce';
import store from '../../store';
import BackButton from '../../components/BackButton';
import Modal from '../../components/Modal';
import useGetSortedTags from './services/useGetSortedTags';

const useStyles = makeStyles(theme => ({
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
  tags: {
    height: 32,
    display: 'flex',
    overflow: 'scroll',
    marginBottom: theme.spacing(3),

    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
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
  onSubmit: (payload: PostEntryPayload) => void;
  entryData?: Partial<Entry>;
};

export default function Editor({
  backLinkProps,
  navTitle,
  submitBtnText,
  onSubmit,
  entryData,
}: Props) {
  const classes = useStyles();
  const [showExitModal, setShotExitmodal] = useState<boolean>(false);
  const { data: tagsData } = useGetSortedTags(entryData?.tags);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [text, setText] = useState(entryData?.text || '');
  const [date, setDate] = useState(entryData?.date?.toISOString().substring(0, 10));
  const [time, setTime] = useState(entryData?.date?.toISOString().substring(11, 16));
  const [tags, setTags] = useState<{ [tagId: string]: boolean }>(
    entryData?.tags
      ? entryData.tags.reduce<{ [key: string]: boolean }>((acc, val) => {
          acc[val] = true;
          return acc;
        }, {})
      : {}
  );

  const debouncedText = useDebounce(text, 500);

  const handleSetTag = (itemId: string) =>
    setTags(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));

  const handleSubmit = () => {
    store.backup = null;
    const filteredTags = Object.keys(tags).filter(i => tags[i]);

    return onSubmit({ text, tags: filteredTags, date: new Date(`${date}T${time}`) });
  };

  const handleBackButton = (next: () => void) => {
    setShotExitmodal(true);
  };

  const handleExitConfirmation = () => {
    store.backup = null;
    handleCloseExitModal();
    navigate(backLinkProps.to, backLinkProps);
  };

  const handleCloseExitModal = () => setShotExitmodal(false);

  useEffect(() => {
    store.backup = {
      id: entryData?.id,
      text: debouncedText,
      date: `${date}T${time}`,
      pathname: window.location.pathname,
      tags: Object.keys(tags).filter(i => tags[i]),
    };
  }, [debouncedText, time, date, tags]);

  return (
    <>
      <NavHeader>
        <BackButton {...backLinkProps} onClick={handleBackButton} />
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
        <div className={classes.tags}>
          {tagsData?.map(item => (
            <Chip
              key={item.id}
              onClick={() => handleSetTag(item.id)}
              // onDelete={tags[item.id] ? () => handleSetTag(item.id) : undefined}
              color={tags[item.id] ? 'primary' : undefined}
              label={item.label}
              // deleteIcon={tags[item.id] ? <DoneIcon /> : undefined}
            />
          ))}
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
      <Modal
        open={showExitModal}
        onClose={handleCloseExitModal}
        title="Wait a second!"
        description="You are leaving unsaved data behind."
        icon={<>icon</>}
        actions={
          <>
            <Button onClick={handleExitConfirmation}>Leave anyway</Button>
            <Button onClick={handleCloseExitModal}>Stay</Button>
          </>
        }
      />
    </>
  );
}
