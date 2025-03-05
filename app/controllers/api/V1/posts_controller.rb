# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :load_post!, only: %i[show]

      def index
        @posts = Post.includes(:categories)

        if params[:category_ids].present?
          category_ids = params[:category_ids].split(",").map(&:to_i)
          @posts = @posts.joins(:categories).where(categories: { id: category_ids }).distinct
        end

        render json: { posts: @posts.as_json(include: :categories) }
      end

      def create
        post = Post.new(post_params)
        # Assume current_user is set through authentication
        # If you don't have authentication yet, you can use a placeholder user:
        post.user = User.first # Replace with current_user once authentication is implemented

        post.save!
        render_notice("Post was successfully created")
      end

      def show
        render_json(
          {
            post: @post.as_json(
              include: {
                user: { only: [:id, :name, :email] },
                categories: { only: [:id, :name] },
                organization: { only: [:id, :name] }
              }
            )
          })
      end

      private

        def load_post!
          @post = Post.find_by!(slug: params[:slug])
        end

        def post_params
          params.require(:post).permit(:title, :description, :organization_id, category_ids: [])
        end
    end
  end
end
