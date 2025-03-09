# test/models/post_test.rb
# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = build(:post)
  end

  # title tests
  test "post should not be valid without title" do
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  test "title should be of valid length" do
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  # description tests
  test "post should not be valid without description" do
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  test "description should be of valid length" do
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert @post.invalid?
  end

  # association tests
  test "post should belong to user" do
    @post.user = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  test "post should belong to organization" do
    @post.organization = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  test "post can have many categories" do
    @post.save!
    category1 = create(:category)
    category2 = create(:category)

    @post.categories << category1
    @post.categories << category2

    assert_equal 2, @post.categories.count
    assert_includes @post.categories, category1
    assert_includes @post.categories, category2
  end

  test "post should have timestamps after save" do
    user = create(:user)
    organization = user.organization
    post = build(:post, user: user, organization: organization)

    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!

    assert_not_nil post.created_at
    assert_not_nil post.updated_at
  end
end
