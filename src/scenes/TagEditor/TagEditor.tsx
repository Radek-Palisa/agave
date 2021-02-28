import React, { useState, useRef } from 'react';
import AppHeader from '../../components/AppHeader';
import BackButton from '../../components/BackButton';
import { ROUTES } from '../../consts';
import { Tag } from '../../types';
import store from '../../store';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from '@reach/router';
import { Button } from '@material-ui/core';
import TagEditorItem from './components/TagEditorItem';
import Modal from '../../components/Modal';
import useSubscribe from '../../services/useSubscribe';

export default function TagEditor(_: RouteComponentProps) {
  const { data } = useSubscribe<Tag[]>(store.subscribeUserTags);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const tagIdToBeDeleted = useRef<string>('');
  const shouldFocusLast = useRef(false);

  const handleAddTag = () => {
    shouldFocusLast.current = true;
    store.addUserTag();
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleOpenDeleteModal = (tagId: string) => {
    tagIdToBeDeleted.current = tagId;
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    store.deleteUserTag(tagIdToBeDeleted.current);
    tagIdToBeDeleted.current = '';
    setShowDeleteModal(false);
  };

  return (
    <div className="page">
      <AppHeader>
        <BackButton to={ROUTES.SETTINGS} />
        <span>Labels</span>
        <span />
      </AppHeader>
      <div>
        <Typography>Labels</Typography>
      </div>
      {data &&
        data.map((tag, i) => (
          <TagEditorItem
            onDelete={() => handleOpenDeleteModal(tag.id)}
            key={tag.id}
            tag={tag}
            autoFocus={i === data.length - 1 && shouldFocusLast.current}
          />
        ))}
      {data && data.length < 10 && <Button onClick={handleAddTag}>Add new label</Button>}
      <Modal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Wait a second!"
        description="You are leaving unsaved data behind."
        icon={<>icon</>}
        actions={
          <>
            <Button color="secondary" onClick={handleDeleteConfirmation}>
              Delete
            </Button>
            <Button onClick={handleCloseDeleteModal}>Close</Button>
          </>
        }
      />
    </div>
  );
}
