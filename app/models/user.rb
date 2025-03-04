# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization
  has_many :posts

  has_secure_password # Handles password hashing with bcrypt

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true
  validates :password_confirmation, presence: true
end
