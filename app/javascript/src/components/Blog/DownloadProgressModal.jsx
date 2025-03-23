import React from "react";

import { Download } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";
import PropTypes from "prop-types";

const DownloadProgressModal = ({ isOpen, onClose, progress }) => (
  <Modal isOpen={isOpen} size="large" onClose={onClose}>
    <Modal.Header>
      <Typography style="h3">Downloading Post</Typography>
    </Modal.Header>
    <Modal.Body className="flex flex-col items-center justify-center space-y-4 p-6">
      <Download className="text-indigo-500" size={48} />
      <Typography style="body1">
        {progress === "generating" ? "Generating PDF..." : "Downloading PDF..."}
      </Typography>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
          style={{
            width: progress === "generating" ? "50%" : "100%",
          }}
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button label="Cancel" style="text" onClick={onClose} />
    </Modal.Footer>
  </Modal>
);

DownloadProgressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  progress: PropTypes.string.isRequired,
};

export default DownloadProgressModal;
