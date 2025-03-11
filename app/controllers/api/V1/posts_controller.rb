# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :load_post!, only: %i[show update]
      before_action :load_posts_for_index, only: %i[index]

      def index
        render :index
      end

      def create
        post = Post.new(post_params)
        post.user = current_user

        post.save!
        render_notice(t("successfully_created", entity: "Post"))
      end

      def show
        render :show
      end

      def update
        @post.update!(post_params)
        render_notice(t("successfully_updated", entity: "Post"))
      end

      private

        def load_post!
          @post = Post.find_by!(slug: params[:slug])
        end

        def post_params
          params.require(:post).permit(:title, :description, :organization_id, category_ids: [])
        end

        def load_posts_for_index
          @posts = Post.includes(:categories, :user, :organization)

          if params[:category_ids].present?

            category_ids = params[:category_ids].is_a?(String) ?
                          params[:category_ids].split(",") :
                          params[:category_ids]
            @posts = @posts.joins(:categories).where(categories: { id: category_ids }).distinct
          end

          @posts = @posts.where(organization_id: current_user.organization_id)
        end
    end
  end
end
