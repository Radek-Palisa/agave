import React from 'react';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export default function DetailDateTitle({ date }: { date?: Date }) {
  return <>{new Intl.DateTimeFormat(undefined, options).format(date)}</>;
}
