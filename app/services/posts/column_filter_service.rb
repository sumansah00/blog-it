# frozen_string_literal: true

class Posts::ColumnFilterService < ApplicationService
  def initialize(posts, visible_columns)
    @posts = posts
    @visible_columns = visible_columns.split(",")
    @visible_columns << "title" unless @visible_columns.include?("title")
  end

  def call
    @posts.map do |post|
      build_filtered_post(post)
    end
  end

  private

    def build_filtered_post(post)
      filtered_post = { id: post.id, slug: post.slug, title: post.title }

      filtered_post[:categories] = post.categories if @visible_columns.include?("categories")
      filtered_post[:last_published_at] = post.last_published_at if @visible_columns.include?("last_published_at")
      filtered_post[:status] = post.status if @visible_columns.include?("status")

      filtered_post
    end
end
