# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice("Task was successfully created")
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
