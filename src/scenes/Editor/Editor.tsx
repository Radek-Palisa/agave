import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import AppHeader from '../../components/AppHeader';
import Markdown from '../../components/Markdown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Entry, PostEntryPayload } from '../../types';
import useDebounce from '../../services/useDebounce';
import BackButton from '../../components/BackButton';
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
}));

type Props = {
  backLinkProps: {
    to: string;
    state?: Entry;
  };
  navTitle: string;
  onChange: (values: PostEntryPayload) => void;
  initialValues: Entry;
};

export default function Editor({ backLinkProps, navTitle, onChange, initialValues }: Props) {
  const classes = useStyles();
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isViewingDocs, setIsViewingDocs] = useState(false);
  const [title, setTitle] = useState(initialValues.title);
  const [text, setText] = useState(initialValues.text);
  const [date] = useState(initialValues.date.toISOString().substring(0, 10));
  const [time] = useState(initialValues.date.toISOString().substring(11, 16));
  const [tags] = useState<{ [tagId: string]: boolean }>(
    initialValues?.tags
      ? initialValues.tags.reduce<{ [key: string]: boolean }>((acc, val) => {
          acc[val] = true;
          return acc;
        }, {})
      : {}
  );

  const debouncedTitle = useDebounce(title, 300);
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    onChange({
      title: debouncedTitle,
      text: debouncedText,
      date: new Date(`${date}T${time}`),
      tags: Object.keys(tags).filter(i => tags[i]),
    });
  }, [debouncedText, debouncedTitle, time, date, tags]);

  useEffect(() => {
    Mousetrap.bind('command+k', function () {
      setIsPreviewing(prev => !prev);
    });

    return () => {
      Mousetrap.reset();
    };
  }, []);

  return (
    <PageWidth>
      <AppHeader>
        <BackButton {...backLinkProps} />
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
      </section>
    </PageWidth>
  );
}
