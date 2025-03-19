import React, { useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { UpArrow, DownArrow } from "neetoicons";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import postsApi from "apis/post";

const Card = ({ blog }) => {
  const {
    title,
    description,
    created_at,
    slug,
    user,
    categories,
    organization,
    upvotes,
    downvotes,
    is_bloggable,
    user_vote,
  } = blog;

  logger.info("Blog:", blog);

  const history = useHistory();
  const [voteData, setVoteData] = useState({
    upvotes: upvotes || 0,
    downvotes: downvotes || 0,
    is_bloggable: is_bloggable || false,
    userVote: user_vote,
  });

  const handleCardClick = e => {
    if (e.target.closest(".voting-section")) {
      return;
    }
    history.push(`/posts/${slug}/show`);
  };

  const handleVote = async (voteType, e) => {
    e.stopPropagation();
    try {
      const response = await (voteType === "upvote"
        ? postsApi.upvote(slug)
        : postsApi.downvote(slug));

      setVoteData({
        upvotes: response.data.upvotes,
        downvotes: response.data.downvotes,
        is_bloggable: response.data.is_bloggable,
        userVote: response.data.user_vote,
      });
    } catch (error) {
      logger.error("Error voting:", error);
    }
  };

  const netVotes = voteData.upvotes - voteData.downvotes;

  return (
    <div
      className="border-1 flex cursor-pointer flex-col gap-1 rounded-md border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <Typography style="h4">{title}</Typography>
        {voteData.is_bloggable && (
          <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Blog it
          </span>
        )}
      </div>
      <Typography className="line-clamp-2 overflow-hidden text-sm text-gray-600">
        {description}
      </Typography>
      <div className="voting-section mt-2 flex items-center gap-2">
        <Button
          icon={UpArrow}
          size="small"
          style={voteData.userVote === "upvote" ? "primary" : "secondary"}
          onClick={e => handleVote("upvote", e)}
        />
        <Typography
          style="body2"
          className={`${
            netVotes > 0 ? "text-green-500" : netVotes < 0 ? "text-red-500" : ""
          }`}
        >
          {netVotes}
        </Typography>
        <Button
          icon={DownArrow}
          size="small"
          style={voteData.userVote === "downvote" ? "primary" : "secondary"}
          onClick={e => handleVote("downvote", e)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col">
          <Typography className="text-xs text-gray-500">
            Author: {user?.name || "Unknown"}
          </Typography>
          <Typography className="text-xs text-gray-500">
            Organization: {organization?.name || "Unknown"}
          </Typography>
        </div>
        <Typography className="text-xs text-gray-400">
          {dayjs(created_at).format("D MMMM YYYY")}
        </Typography>
      </div>
      {categories && categories.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {categories.map(category => (
            <span
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
              key={category.id}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    slug: PropTypes.string.isRequired,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    is_bloggable: PropTypes.bool,
    user_vote: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Card;
