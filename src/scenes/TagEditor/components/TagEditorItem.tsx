import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Tag } from '../../../types';
import TextField from '@material-ui/core/TextField';
import store from '../../../store';
import useDebounce from '../../../services/useDebounce';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(1),

    '& > button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

type Props = {
  tag?: Tag;
  autoFocus?: boolean;
  onDelete: () => void;
};

export default function TagEditorItem({ tag, autoFocus, onDelete }: Props) {
  const classes = useStyles();
  const [label, setLabel] = useState(tag?.label || '');
  const [isFocused, setIsFocused] = useState(false);
  const tagData = useRef({ id: tag?.id || '' });

  const debouncedLabel = useDebounce(label, 300);

  useEffect(() => {
    if (isFocused) {
      console.log('triggering');
      store.editUserTag({ id: tagData.current.id, label: debouncedLabel.trim() });
    }
  }, [debouncedLabel]);

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        autoFocus={autoFocus}
        variant="outlined"
        value={label}
        onChange={handleLabelChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
