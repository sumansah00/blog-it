# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :load_post!, only: %i[show]

      def index
        posts = Post.all
        render status: :ok, json: { posts: }
      end

      def create
        post = Post.new(post_params)
        post.save!
        render_notice("Task was successfully created")
      end

      def show
        render_json({ post: @post })
      end

      private

        def load_post!
          @post = Post.find_by!(slug: params[:slug])
        end

        def post_params
          params.require(:post).permit(:title, :description)
        end
    end
  end
end
