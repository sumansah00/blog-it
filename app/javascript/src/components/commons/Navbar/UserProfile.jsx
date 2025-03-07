import React, { useState, useRef, useEffect } from "react";

import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import PropTypes from "prop-types";

const UserProfile = ({ userName, userEmail, onLogout }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const avatarRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isPopoverOpen &&
        popoverRef.current &&
        avatarRef.current &&
        !popoverRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopoverOpen]);

  return (
    <div className="relative mt-auto">
      <Button
        className="flex items-center gap-x-2 rounded-md p-2"
        ref={avatarRef}
        style="text"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <Avatar
          size="small"
          user={{
            name: userName,
            imageUrl: null,
          }}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        />
      </Button>
      {isPopoverOpen && (
        <div
          className="absolute bottom-12 left-0 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          ref={popoverRef}
          style={{ minWidth: "220px" }}
        >
          <div className="p-4">
            <div className="mb-4 flex items-center gap-x-3">
              <Avatar
                size="medium"
                user={{
                  name: userName,
                  imageUrl: null,
                }}
              />
              <div>
                <Typography style="h5">{userName}</Typography>
                <Typography className="text-gray-500" style="body3">
                  {userEmail}
                </Typography>
              </div>
            </div>
            <Button style="danger" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserProfile;
