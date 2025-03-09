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

  # Tests for slug generation
  test "should generate unique slug" do
    user = create(:user)
    organization = user.organization

    post1 = create(:post, title: "Sample Post", user: user, organization: organization)
    assert_equal "sample-post", post1.slug

    # Create a post with the same title to force a unique slug
    post2 = create(:post, title: "Sample Post", user: user, organization: organization)
    assert_equal "sample-post-2", post2.slug
  end

  test "should increment slug counter correctly" do
    user = create(:user)
    organization = user.organization

    # Create posts with the same title to test slug incrementation
    first_post = create(:post, title: "My Title", user: user, organization: organization)
    assert_equal "my-title", first_post.slug

    second_post = create(:post, title: "My Title", user: user, organization: organization)
    assert_equal "my-title-2", second_post.slug

    # Test the slug increment logic by creating one more
    third_post = create(:post, title: "My Title", user: user, organization: organization)
    assert_equal "my-title-3", third_post.slug
  end

  test "should not allow slug to be changed after creation" do
    post = create(:post)
    original_slug = post.slug

    # Try to update the slug
    post.slug = "new-slug"
    assert_not post.valid?

    # Check if errors contain a message about immutable slug
    assert_not_empty post.errors[:slug]

    # Make sure slug hasn't changed
    post.reload
    assert_equal original_slug, post.slug
  end
end
