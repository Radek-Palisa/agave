import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { makeStyles, Button } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import Markdown from '../../components/Markdown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { PostEntryPayload, Entry } from '../../types';
import useDebounce from '../../services/useDebounce';
import store from '../../store';
import BackButton from '../../components/BackButton';
import Modal from '../../components/Modal';
import IconButton from '@material-ui/core/IconButton';
import { AutoResizedTextarea, AutoResizedTitlearea } from './components/AutoResizedTextarea';
import PageWidth from '../../components/PageWidth';
import Mousetrap from 'mousetrap';
import EditorMarkdownDocs from './components/EditorMarkdownDocs';

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
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isViewingDocs, setIsViewingDocs] = useState(false);
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

  const debouncedTitle = useDebounce(title, 300);
  const debouncedText = useDebounce(text, 500);

  const handleSubmit = () => {
    const filteredTags = Object.keys(tags).filter(i => tags[i]);
    return onSubmit({ text, title, tags: filteredTags, date: new Date(`${date}T${time}`) });
  };

  useEffect(() => {
    Mousetrap.bind('command+k', function () {
      setIsPreviewing(prev => !prev);
    });

    return () => {
      Mousetrap.reset();
    };
  }, []);

  useEffect(() => {
    store.backup = {
      id: entryData?.id,
      title: debouncedTitle,
      text: debouncedText,
      date: `${date}T${time}`,
      pathname: window.location.pathname,
      tags: Object.keys(tags).filter(i => tags[i]),
    };
  }, [debouncedText, debouncedTitle, time, date, tags]);

  return (
    <PageWidth>
      <AppHeader>
        <BackButton {...backLinkProps} onClick={handleSubmit} />
        <span>{navTitle}</span>
        <div>
          <IconButton
            onClick={() => setIsViewingDocs(prev => !prev)}
            color={isPreviewing ? 'primary' : 'default'}
            aria-label="toggle visibility"
          >
            <MenuBookIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsPreviewing(prev => !prev)}
            color={isPreviewing ? 'primary' : 'default'}
            aria-label="toggle visibility"
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      </AppHeader>

      {isViewingDocs && <EditorMarkdownDocs />}

      <section className={classes.editorRoot}>
        <AutoResizedTitlearea readonly={isPreviewing} onChange={setTitle} value={title} />
        {isPreviewing ? (
          <Markdown className={classes.markdown} text={text} />
        ) : (
          <AutoResizedTextarea onChange={setText} value={text} />
        )}
        {/* <Button className={classes.submit} variant="contained" onClick={handleSubmit}>
          {submitBtnText}
        </Button> */}
      </section>
    </PageWidth>
  );
}
