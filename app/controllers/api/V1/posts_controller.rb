# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      after_action :verify_authorized, except: %i[index create my_post]
      after_action :verify_policy_scoped, only: %i[index]
      before_action :load_post!, only: %i[show update destroy]
      before_action :load_posts_for_index, only: %i[index my_post]

      def index
        filter_columns_for_posts if params[:visible_columns].present?
        render :index
      end

      def my_post
        puts "--------------->"
        render :index
      end

      def create
        post = Post.new(post_params)
        post.user = current_user
        post.organization = current_user.organization

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
          params.require(:post).permit(
            :title,
            :description,
            :status,
            category_ids: []
          )
        end

        def load_posts_for_index
          @posts = policy_scope(Post)
          @posts = @posts.includes(:categories, :user, :organization)

          if params[:filter] == "my_posts"
            @posts = @posts.where(user_id: current_user.id)
          else
            @posts = @posts.where(status: "published")
          end

          if params[:category_ids].present?
            category_ids = params[:category_ids].is_a?(String) ?
                          params[:category_ids].split(",") :
                          params[:category_ids]
            @posts = @posts.joins(:categories)
              .where(categories: { id: category_ids })
              .distinct
          end
        end

        def filter_columns_for_posts
          # Always keep the title column
          visible_columns = params[:visible_columns].split(",")
          visible_columns << "title" unless visible_columns.include?("title")

          # Map the posts to include only the visible columns
          @posts = @posts.map do |post|
            filtered_post = { id: post.id, slug: post.slug }

            # Always include title
            filtered_post[:title] = post.title

            # Include other columns based on visibility
            filtered_post[:categories] = post.categories if visible_columns.include?("categories")
            filtered_post[:last_published_at] = post.last_published_at if visible_columns.include?("last_published_at")
            filtered_post[:status] = post.status if visible_columns.include?("status")

            filtered_post
          end
        end
    end
  end
end
