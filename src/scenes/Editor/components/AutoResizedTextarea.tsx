import React from 'react';
import { Theme } from '@material-ui/core';

import makeStyles from '@material-ui/styles/makeStyles';

const autoResizeRootStyles = {
  width: '100%',
  display: 'inline-grid',
  verticalAlign: 'top',
  position: 'relative',
  alignItems: 'stretch',

  '&::after': {
    content: "attr(data-value) ' '",
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
  },
} as const;

const textAreaStyles = {
  width: 'auto',
  overflow: 'auto',
  minWidth: '1em',
  gridArea: '2 / 1',
  margin: 0,
  resize: 'none',
  background: 'none',
  appearance: 'none',
  border: 'none',
  outline: 'none',
} as const;

const useTitleStyles = makeStyles((theme: Theme) => ({
  autoResizedAreaRoot: {
    ...autoResizeRootStyles,

    '&::after,textarea': {
      ...textAreaStyles,
      padding: theme.spacing(2),
      // fontFamily: theme.typography.fontFamily,
      // fontWeight: 600,
      // lineHeight: 1.4,
      // fontSize: 20,
      ...theme.typography.h1,
    },
  },
}));

const useTextStyles = makeStyles((theme: Theme) => ({
  autoResizedAreaRoot: {
    ...autoResizeRootStyles,

    '&::after,textarea': {
      ...textAreaStyles,
      padding: theme.spacing(2),
      ...theme.typography.body1,
    },
  },
}));

type Props = {
  onChange: (text: string) => void;
  value: string;
  readonly?: boolean;
};

export function AutoResizedTitlearea({ onChange, value, readonly = false }: Props) {
  const classes = useTitleStyles();

  return (
    <div className={`${classes.autoResizedAreaRoot}`} data-value={value}>
      <textarea
        readOnly={readonly}
        placeholder="Recently"
        className="mousetrap"
        onChange={e => onChange(e.target.value)}
        rows={1}
        value={value}
      />
    </div>
  );
}

export function AutoResizedTextarea({ onChange, value }: Props) {
  const classes = useTextStyles();

  return (
    <div className={`${classes.autoResizedAreaRoot}`} data-value={value}>
      <textarea
        placeholder="What's up"
        className="mousetrap"
        onChange={e => onChange(e.target.value)}
        rows={1}
        value={value}
      />
    </div>
  );
}
