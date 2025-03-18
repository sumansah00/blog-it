# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      after_action :verify_authorized, except: %i[index create my_post]
      after_action :verify_policy_scoped, only: %i[index]
      before_action :load_post!, only: %i[show update destroy]
      before_action :load_posts_for_index, only: %i[index]
      before_action :load_posts_for_my_post, only: %i[my_post]

      def index
        filter_columns_for_posts if params[:visible_columns].present?
        render :index
      end

      def my_post
        render :my_post
      end

      def create
        post = Posts::CreatorService.call(current_user, params)
        render_notice(t("successfully_created", entity: "Post"))
      end

      def show
        authorize @post
        render :show
      end

      def update
        authorize @post
        @post.update!(post_params)
        render_notice(t("successfully_updated", entity: "Post"))
      end

      def destroy
        authorize @post
        @post.destroy
        render_notice(t("successfully_deleted", entity: "Post"))
      end

      private

        def load_post!
          @post = Post.find_by!(slug: params[:slug])
        end

        def post_params
          params.require(:post).permit(
            :title,
            :description,
            :status,
            category_ids: []
          )
        end

        def base_posts_query
          posts = policy_scope(Post)
          posts = posts.includes(:categories, :user, :organization)
          Posts::FilterService.call(posts, params)
        end

        def load_posts_for_index
          @posts = base_posts_query
          @posts = @posts.where(status: "published")
        end

        def load_posts_for_my_post
          @posts = base_posts_query
          @posts = @posts.where(user_id: current_user.id)
        end

        def filter_columns_for_posts
          @posts = Posts::ColumnFilterService.call(@posts, params[:visible_columns])
        end
    end
  end
end
