import React, { useState } from "react";

import { MenuHorizontal, Delete, ExternalLink } from "neetoicons";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import DeletePostModal from "./DeletePostModal";

const labels = {
  draft: "Save as Draft",
  publish: "Publish",
};

const PostHeader = ({
  title,
  isEdit = false,
  onSaveAsDraft,
  onPublish,
  onDelete,
  isSubmitting,
  onPreview,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [label, setLabel] = useState(labels.draft);
  const [selectedAction, setSelectedAction] = useState("draft");

  const history = useHistory();

  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = ActionDropdown;

  const handleSaveAsDraft = () => {
    setLabel(labels.draft);
    setSelectedAction("draft");
  };

  const handlePublish = () => {
    setLabel(labels.publish);
    setSelectedAction("publish");
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await onDelete();
    setShowDeleteModal(false);
  };

  const handleMainButtonClick = () => {
    if (selectedAction === "draft") {
      onSaveAsDraft();
    } else if (selectedAction === "publish") {
      onPublish();
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="ml-4 text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={ExternalLink} style="secondary" onClick={onPreview} />
          <Button label="Cancel" style="secondary" onClick={handleCancel} />
          <ActionDropdown
            buttonStyle="primary"
            disabled={isSubmitting}
            label={label}
            onClick={handleMainButtonClick}
          >
            <Menu>
              <MenuItemButton
                onClick={() => {
                  handleSaveAsDraft();
                  onSaveAsDraft();
                }}
              >
                Save as Draft
              </MenuItemButton>
              <MenuItemButton
                onClick={() => {
                  handlePublish();
                  onPublish();
                }}
              >
                Publish
              </MenuItemButton>
            </Menu>
          </ActionDropdown>
          {isEdit && (
            <Dropdown icon={MenuHorizontal}>
              <Menu>
                <MenuItemButton
                  icon={Delete}
                  style="danger"
                  onClick={handleDelete}
                >
                  Delete
                </MenuItemButton>
              </Menu>
            </Dropdown>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeletePostModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isEdit: PropTypes.bool,
  onSaveAsDraft: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onPreview: PropTypes.func.isRequired,
};

export default PostHeader;
