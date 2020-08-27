import React from 'react';
import { Location, navigate } from '@reach/router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ROUTES } from '../consts';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import TuneIcon from '@material-ui/icons/Tune';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState<string>(ROUTES.HOME);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Location>
      {({ location }) => {
        if (location.pathname === ROUTES.HOME || location.pathname === ROUTES.SETTINGS) {
          return (
            <BottomNavigation
              value={value}
              onChange={handleChange}
              showLabels
              classes={{ root: classes.root }}
            >
              <BottomNavigationAction value={ROUTES.HOME} label="Home" icon={<ViewStreamIcon />} />
              <BottomNavigationAction
                value={ROUTES.ADD_ENTRY}
                label="Add Entry"
                icon={<AddBoxOutlinedIcon />}
              />
              <BottomNavigationAction
                value={ROUTES.SETTINGS}
                label="Settings"
                icon={<TuneIcon />}
              />
            </BottomNavigation>
          );
        }
        return null;
      }}
    </Location>
  );
}
