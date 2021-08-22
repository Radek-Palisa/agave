import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';

const useStyles = makeStyles(theme => ({
  editorMarkdownDocsRoot: {
    zIndex: 1,
    position: 'fixed',
    top: theme.custom.appHeaderHeight,
    bottom: 0,
    left: 0,
    width: '100%',
    'overscroll-behavior-y': 'contain',
    backgroundColor: 'white',
  },
}));

export default function EditorMarkdownDocs() {
  const classes = useStyles();

  return (
    <div className={classes.editorMarkdownDocsRoot}>
      <MarkdownDocs />
    </div>
  );
}
