import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from '@material-ui/core';

const data = [
  {
    day: 23,
    entry: `Donec sit amet augue at enim sollicitudin porta. Praesent finibus ex velit, quis faucibus
    libero congue et. Quisque convallis eu nisl et congue. Vivamus eget augue quis ante malesuada
    ullamcorper. Sed orci nulla, eleifend eget dui faucibus, facilisis aliquet ante. Suspendisse
    sollicitudin nibh lacus, ut bibendum risus elemen`,
  },
];

function Entry({ day, entry }: any) {
  return (
    <div style={{ display: 'flex' }}>
      <Typography style={{ minWidth: '50px' }} variant="h6" align="center" component="h3">
        {day}
      </Typography>
      <Typography variant="body2">{entry}</Typography>
    </div>
  );
}

export default function Home(props: RouteComponentProps) {
  return (
    <div className="page">
      {data.map(item => (
        <Entry key={item.day} {...item} />
      ))}
      {/* <Typography variant="h3">Heading3 48px</Typography>
      <Typography variant="h4">Heading4 34px</Typography>
      <Typography variant="h5">Heading5 24px</Typography>
      <Typography variant="h6">Heading6 20px</Typography>
      <Typography variant="subtitle1">Subtitle1 16px</Typography>
      <Typography variant="subtitle2">Subtitle2 14px</Typography>
      <Typography variant="body1">body1 16px</Typography>
      <Typography variant="body2">body2 14px</Typography>
      <Typography variant="button">Button 14px</Typography>
      <br />
      <Typography variant="caption">Caption 12px</Typography>
      <br />
      <Typography variant="overline">Overline 10px</Typography> */}
    </div>
  );
}
