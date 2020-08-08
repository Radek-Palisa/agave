import React from 'react';
import MarkdownToJSX from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    marginTop: 0,

    '& > *': {
      marginTop: '0',
    },
    '& > h1': {
      ...theme.typography.body2,
      fontWeight: theme.typography.h6.fontWeight,
    },
    '& > ul, & > ol': {
      paddingLeft: 18,
    },
  },
}));

type Props = {
  className?: string;
  text: string;
};

export default function Markdown({ text, className }: Props) {
  const classes = useStyles();
  return (
    <MarkdownToJSX
      options={{ forceBlock: true }}
      className={`${classes.root}${className ? ` ${className}` : ''}`}
    >
      {text}
    </MarkdownToJSX>
  );
}
