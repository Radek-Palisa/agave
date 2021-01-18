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

    '& pre': {
      fontSize: '0.882352em',
      padding: theme.spacing(1),
      backgroundColor: '#1d1c1d0a',
      border: '1px solid #1d1c1d21',
      borderRadius: 4,

      '& code': {
        color: 'initial',
      },
    },

    '& code': {
      color: '#e01e5a',
    },

    '& hr': {
      border: 'none',
      backgroundColor: '#1d1c1d21',
      height: 1,
      margin: '0 -20px 1em',

      '@media (min-width: 700px)': {
        width: '20%',
        margin: '2em auto',
        backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
      },
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
