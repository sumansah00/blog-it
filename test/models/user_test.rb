# test/models/user_test.rb
# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    user = build(:user)
    assert user.valid?
  end

  test "should not be valid without email" do
    user = build(:user, email: nil)
    assert_not user.valid?
    assert_includes user.errors.messages[:email], "can't be blank"
  end

  test "should not be valid with duplicate email" do
    organization = create(:organization)
    create(:user, email: "test@example.com", organization: organization)
    user = build(:user, email: "test@example.com", organization: organization)
    assert_not user.valid?
    assert_includes user.errors.messages[:email], "has already been taken"
  end

  test "should have many posts" do
    user = create(:user)
    post = create(:post, user: user, organization: user.organization)
    assert_includes user.posts, post
  end

  test "should belong to an organization" do
    organization = create(:organization)
    user = create(:user, organization: organization)
    assert_equal organization, user.organization
  end
end
