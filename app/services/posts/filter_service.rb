# frozen_string_literal: true

class Posts::FilterService < ApplicationService
  def initialize(posts, params)
    @posts = posts
    @params = params
  end

  def call
    filter_by_category
    filter_by_title
    filter_by_status
    @posts
  end

  private

    def filter_by_category
      return unless @params[:category_ids].present?

      category_ids = @params[:category_ids].is_a?(String) ?
                    @params[:category_ids].split(",") :
                    @params[:category_ids]

      @posts = @posts.joins(:categories)
        .where(categories: { id: category_ids })
        .distinct
    end

    def filter_by_title
      return unless @params[:title].present?

      @posts = @posts.where("title LIKE ?", "%#{@params[:title]}%")
    end

    def filter_by_status
      return unless @params[:status].present?

      @posts = @posts.where(status: @params[:status])
    end
end
