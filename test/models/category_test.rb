# test/models/category_test.rb
# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    category = build(:category)
    assert category.valid?
  end

  test "should not be valid without name" do
    category = build(:category, name: nil)
    assert_not category.valid?
    assert_includes category.errors.full_messages, "Name can't be blank"
  end

  test "should have and belong to many posts" do
    category = create(:category)
    post = create(:post)
    category.posts << post
    assert_includes category.posts, post
  end
end
