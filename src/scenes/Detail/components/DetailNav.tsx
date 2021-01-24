import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Entry } from '../../../types';
import { navigate } from '@reach/router';
import store from '../../../store';
import { ROUTES } from '../../../consts';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Modal from '../../../components/Modal';

type Props = {
  onEntryDelete: () => void;
};

export function DetailNav({ onEntryDelete }: Props) {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

  const handleConfirmModalClose = () => setConfirmDeleteModalOpen(false);

  const handleDelete = () => {
    onEntryDelete();
    store.setCurrentEntry(null);
    navigate(ROUTES.HOME);
  };

  const handleEditClick = () => {
    navigate(ROUTES.EDIT_ENTRY);
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="menu"
        aria-controls="detail-menu"
        aria-haspopup="true"
        onClick={() => setConfirmDeleteModalOpen(true)}
      >
        <DeleteOutlineIcon />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="menu"
        aria-controls="detail-menu"
        aria-haspopup="true"
        onClick={handleEditClick}
      >
        <EditIcon />
      </IconButton>
      <Modal
        open={confirmDeleteModalOpen}
        onClose={handleConfirmModalClose}
        title="Delete entry"
        description="Are you sure you want to delete this entry?"
        icon={<>icon</>}
        actions={
          <>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleConfirmModalClose}>Cancel</Button>
          </>
        }
      />
    </div>
  );
}
