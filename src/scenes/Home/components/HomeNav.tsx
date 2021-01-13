import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { navigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SortIcon from '@material-ui/icons/Sort';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from '@reach/router';

import { ROUTES } from '../../../consts';
const useStyles = makeStyles({
  menuIcon: {
    transform: 'rotateY(180deg);',
  },
  drawerContents: {
    width: 250,
    padding: 30,
  },
});

export default function HomeNav() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <IconButton
        onClick={() => {
          navigate(ROUTES.ADD_ENTRY);
        }}
        color="primary"
        aria-label="add entry"
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton onClick={() => setIsDrawerOpen(true)} color="primary" aria-label="menu">
        <SortIcon className={classes.menuIcon} />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        disableSwipeToOpen
        disableDiscovery
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <div className={classes.drawerContents}>
          <Link to={ROUTES.SETTINGS}>Settings</Link>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
