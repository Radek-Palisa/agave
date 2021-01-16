import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { makeStyles, Button } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import Markdown from '../../components/Markdown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { PostEntryPayload, Entry } from '../../types';
import useDebounce from '../../services/useDebounce';
import store from '../../store';
import BackButton from '../../components/BackButton';
import Modal from '../../components/Modal';
import IconButton from '@material-ui/core/IconButton';
import { AutoResizedTextarea, AutoResizedTitlearea } from './components/AutoResizedTextarea';
import PageWidth from '../../components/PageWidth';

const useStyles = makeStyles(theme => ({
  editorRoot: {
    maxWidth: 700,
    paddingTop: 80,
  },
  markdown: {
    padding: theme.spacing(2),
  },
  submit: {
    margin: '150px 16px 30px',
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
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [title, setTitle] = useState(entryData?.title || '');
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

  const handleSubmit = () => {
    store.backup = null;
    const filteredTags = Object.keys(tags).filter(i => tags[i]);

    return onSubmit({ text, title, tags: filteredTags, date: new Date(`${date}T${time}`) });
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
      title: title,
      text: debouncedText,
      date: `${date}T${time}`,
      pathname: window.location.pathname,
      tags: Object.keys(tags).filter(i => tags[i]),
    };
  }, [debouncedText, time, date, tags]);

  return (
    <PageWidth>
      <AppHeader>
        <BackButton {...backLinkProps} onClick={handleBackButton} />
        <span>{navTitle}</span>
        <IconButton
          onClick={() => setIsPreviewing(prev => !prev)}
          color={isPreviewing ? 'primary' : 'default'}
          aria-label="toggle visibility"
        >
          <VisibilityIcon />
        </IconButton>
      </AppHeader>

      <section className={classes.editorRoot}>
        <AutoResizedTitlearea readonly={isPreviewing} onChange={setTitle} value={title} />
        {isPreviewing ? (
          <Markdown className={classes.markdown} text={text} />
        ) : (
          <AutoResizedTextarea onChange={setText} value={text} />
        )}
        <Button className={classes.submit} variant="contained" onClick={handleSubmit}>
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
    </PageWidth>
  );
}
