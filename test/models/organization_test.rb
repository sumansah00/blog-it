# test/models/organization_test.rb
# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    organization = build(:organization)
    assert organization.valid?
  end

  test "should not be valid without name" do
    organization = build(:organization, name: nil)
    assert_not organization.valid?
    assert_includes organization.errors.full_messages, "Name can't be blank"
  end

  test "should have many users" do
    organization = create(:organization)
    user = create(:user, organization: organization)
    assert_includes organization.users, user
  end

  test "should have many posts" do
    organization = create(:organization)
    post = create(:post, organization: organization)
    assert_includes organization.posts, post
  end
end
