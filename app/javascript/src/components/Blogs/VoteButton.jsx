import React from "react";

import { Button } from "@bigbinary/neetoui";
import { UpArrow, DownArrow } from "neetoicons";

const VoteButton = ({ type, onClick, active }) => {
  const Icon = type === "upvote" ? UpArrow : DownArrow;

  return (
    <Button
      icon={Icon}
      size="small"
      style={active ? "primary" : "secondary"}
      onClick={onClick}
    />
  );
};

export default VoteButton;
