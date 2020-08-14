import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Entry } from '../../../types';
import { Link, navigate } from '@reach/router';
import store from '../../../store';

type Props = {
  itemData?: Entry;
};

export function DetailMenu({ itemData }: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (!itemData?.id) {
      throw new Error('missing entry id');
    }
    store.deleteEntry(itemData?.id);
    navigate('/');
  };

  return (
    <div>
      <IconButton
        aria-label="menu"
        aria-controls="detail-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="detail-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //   },
        // }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/edit" state={itemData}>
            Edit
          </Link>
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
