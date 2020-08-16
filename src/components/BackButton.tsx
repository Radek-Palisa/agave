import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { navigate, NavigateOptions } from '@reach/router';

type Props = {
  onClick?: (cb: () => void) => void;
  to: string;
} & NavigateOptions<any>;

export default function BackButton({ onClick, to, ...options }: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick(() => navigate(to, options));
    }
    navigate(to, options);
  };

  return (
    <IconButton onClick={handleClick} aria-label="navigate back">
      <ArrowBackIcon />
    </IconButton>
  );
}
