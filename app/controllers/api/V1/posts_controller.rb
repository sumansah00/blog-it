# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :load_post!, only: %i[show]
      before_action :load_posts_for_index, only: %i[index]

      def index
        render :index
      end

      def create
        post = Post.new(post_params)
        # Assume current_user is set through authentication
        # If you don't have authentication yet, you can use a placeholder user:
        post.user = User.first # Replace with current_user once authentication is implemented

        post.save!
        render_notice(t("successfully_created", entity: "Post"))
      end

      def show
        render :show
      end

      private

        def load_post!
          @post = Post.find_by!(slug: params[:slug])
        end

        def post_params
          params.require(:post).permit(:title, :description, :organization_id, category_ids: [])
        end

        def load_posts_for_index
          @posts = Post.includes(:categories)
        end
    end
  end
end
