import React, { useState } from "react";

import { Typography, Button, Input, Modal } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const NewCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setIsSubmitting(true);
      const success = await onSubmit(newCategoryName);

      if (success) {
        setNewCategoryName("");
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewCategoryName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Typography style="h3">Add New Category</Typography>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Category Name"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button label="Cancel" style="text" onClick={handleClose} />
        <Button label="Add" loading={isSubmitting} onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
};

NewCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewCategoryModal;
