import React from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const DeletePostModal = ({ isOpen, onClose, onDelete }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Modal.Header>
      <Typography style="h3">Delete Post</Typography>
    </Modal.Header>
    <Modal.Body>
      <Typography style="body2">
        Are you sure you want to delete this post? This action cannot be undone.
      </Typography>
    </Modal.Body>
    <Modal.Footer>
      <Button label="Cancel" style="text" onClick={onClose} />
      <Button label="Delete" style="danger" onClick={onDelete} />
    </Modal.Footer>
  </Modal>
);

DeletePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeletePostModal;
