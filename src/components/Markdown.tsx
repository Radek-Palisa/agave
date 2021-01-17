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
      // ...theme.typography.body2,
      // fontWeight: theme.typography.h6.fontWeight,
      fontSize: '1rem',
    },
    '& > ul, & > ol': {
      paddingLeft: 18,
    },

    '& img': {
      maxWidth: '100%',
    },

    '& blockquote': {
      marginLeft: 0,
      paddingLeft: theme.spacing(2),
      borderLeft: '4px solid #9a9a9a',
      color: '#797979',
    },
  },
}));

type Props = {
  className?: string;
  id?: string;
  text: string;
};

export default function Markdown({ id, text, className }: Props) {
  const classes = useStyles();
  return (
    <MarkdownToJSX
      id={id}
      options={{ forceBlock: true }}
      className={`${classes.root}${className ? ` ${className}` : ''}`}
    >
      {text}
    </MarkdownToJSX>
  );
}
