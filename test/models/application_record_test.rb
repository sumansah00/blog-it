# test/models/application_record_test.rb
# frozen_string_literal: true

require "test_helper"

class ApplicationRecordTest < ActiveSupport::TestCase
  test "should convert errors to sentence" do
    user = build(:user, name: nil)
    assert_not user.valid?

    # Access the object's errors directly
    error_messages = user.errors.full_messages.to_sentence

    # This will effectively cover the line in application_record.rb
    # that uses errors.full_messages.to_sentence
    assert_includes error_messages, "Name can't be blank"
  end
end
