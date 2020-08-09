import React from 'react';
import { Typography } from '@material-ui/core';

type Props = {
  errorMessage?: string;
};

export default function ErrorText({ errorMessage }: Props) {
  return (
    <Typography variant="caption" color="error">
      {errorMessage || 'ups something went wrong'}
    </Typography>
  );
}
