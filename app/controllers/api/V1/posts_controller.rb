# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      after_action :verify_authorized, except: :index
      after_action :verify_policy_scoped, only: :index
      before_action :load_post!, only: %i[show update destroy]
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
          params.require(:post).permit(:title, :description, :organization_id, category_ids: [])
        end

        def load_posts_for_index
          @posts = policy_scope(Post)

          @posts.includes(:categories, :user, :organization)

          if params[:category_ids].present?
            category_ids = params[:category_ids].is_a?(String) ?
                          params[:category_ids].split(",") :
                          params[:category_ids]
            @posts = @posts.joins(:categories).where(categories: { id: category_ids }).distinct
          end
        end
    end
  end
end
