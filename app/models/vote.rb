# frozen_string_literal: true

class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :vote_type, presence: true, inclusion: { in: ["upvote", "downvote"] }
  validates :user_id, uniqueness: { scope: :post_id, message: "can only vote once per post" }

  after_create :update_post_votes
  after_destroy :update_post_votes

  private

    def update_post_votes
      post.update_vote_counts
    end
end
