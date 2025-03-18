import React from "react";

import { MenuHorizontal, Delete, Clock } from "neetoicons";
import { Dropdown } from "neetoui";

const Actions = ({ post, onPublish, onUnpublish, onDelete }) => {
  const {
    Menu,
    MenuItem: { Button: MenuItemButton },
  } = Dropdown;

  if (!post?.slug) return null;

  return (
    <Dropdown buttonStyle="secondary" icon={MenuHorizontal} strategy="fixed">
      <Menu>
        {post.status === "published" && (
          <MenuItemButton icon={Clock} onClick={() => onUnpublish(post.slug)}>
            Unpublish
          </MenuItemButton>
        )}
        {post.status === "draft" && (
          <MenuItemButton icon={Clock} onClick={() => onPublish(post.slug)}>
            Publish
          </MenuItemButton>
        )}
        <MenuItemButton
          icon={Delete}
          style="danger"
          onClick={() => onDelete(post.slug)}
        >
          Delete
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default Actions;
