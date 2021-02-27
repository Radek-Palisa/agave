import React from 'react';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
} as const;

export default function DetailDateTitle({ date }: { date?: Date }) {
  return <>{new Intl.DateTimeFormat(undefined, options).format(date)}</>;
}
