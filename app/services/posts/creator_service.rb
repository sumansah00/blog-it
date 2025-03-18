  # frozen_string_literal: true

  class Posts::CreatorService < ApplicationService
    def initialize(user, params)
      @user = user
      @params = params
    end

    def call
      post = Post.new(post_params)
      post.user = @user
      post.organization = @user.organization
      post.save!
      post
    end

    private

      def post_params
        @params.require(:post).permit(
          :title,
          :description,
          :status,
          category_ids: []
        )
      end
  end
