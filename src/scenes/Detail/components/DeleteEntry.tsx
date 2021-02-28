import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import Modal from '../../../components/Modal';

type Props = {
  onEntryDelete: () => void;
};

export function DeleteEntry({ onEntryDelete }: Props) {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

  const handleConfirmModalClose = () => setConfirmDeleteModalOpen(false);

  return (
    <>
      <IconButton
        color="primary"
        aria-label="menu"
        aria-controls="detail-menu"
        aria-haspopup="true"
        onClick={() => setConfirmDeleteModalOpen(true)}
      >
        <DeleteOutlineIcon />
      </IconButton>
      <Modal
        open={confirmDeleteModalOpen}
        onClose={handleConfirmModalClose}
        title="Delete entry"
        description="Are you sure you want to delete this entry?"
        icon={<>icon</>}
        actions={
          <>
            <Button onClick={onEntryDelete}>Delete</Button>
            <Button onClick={handleConfirmModalClose}>Cancel</Button>
          </>
        }
      />
    </>
  );
}
