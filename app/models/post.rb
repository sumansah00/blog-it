# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH }

  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }

  validates :is_bloggable,
    inclusion: { in: [true, false] }
end
