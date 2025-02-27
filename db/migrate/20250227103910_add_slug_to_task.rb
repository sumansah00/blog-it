# frozen_string_literal: true

class AddSlugToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :slug, :string
  end
end
