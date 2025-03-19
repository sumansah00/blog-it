# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      after_action :verify_authorized, except: %i[index create my_post bulk_delete bulk_update_status upvote downvote]
      after_action :verify_policy_scoped, only: %i[index]
      before_action :load_post!, only: %i[show update destroy upvote downvote]
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

      def bulk_delete
        posts = Post.where(id: params[:post_ids])
        authorized_posts = posts.select { |post| post.user_id == current_user.id }

        if authorized_posts.any?
          Post.where(id: authorized_posts.map(&:id)).destroy_all
          render_notice(t("successfully_deleted", entity: "Posts"))
        else
          render_error(t("not_found", entity: "Posts"))
        end
      end

      def bulk_update_status
        posts = Post.where(id: params[:post_ids])
        authorized_posts = posts.select { |post| post.user_id == current_user.id }

        if authorized_posts.any? && params[:status].present?
          Post.where(id: authorized_posts.map(&:id))
            .update_all(status: params[:status])
          render_notice(t("successfully_updated", entity: "Posts status"))
        else
          render_error(t("not_found", entity: "Posts"))
        end
      end

      def upvote
        handle_vote("upvote")
      end

      def downvote
        handle_vote("downvote")
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

        def handle_vote(vote_type)
          existing_vote = @post.vote_by_user(current_user)

          if existing_vote
            if existing_vote.vote_type == vote_type
              existing_vote.destroy
            else
              existing_vote.update(vote_type: vote_type)
            end
          else
            @post.votes.create(user: current_user, vote_type: vote_type)
          end

          render json: {
            net_votes: @post.net_votes,
            upvotes: @post.upvotes,
            downvotes: @post.downvotes,
            is_bloggable: @post.is_bloggable
          }
        end
    end
  end
end
