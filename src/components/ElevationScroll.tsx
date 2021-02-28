import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

type Props = {
  children: React.ReactNode;
};

export default function ElevationScroll({ children }: Props) {
  useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // return React.cloneElement(children, {
  //   elevation: trigger ? 4 : 0,
  // });
  return <div>{children}</div>;
}
