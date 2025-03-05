# frozen_string_literal: true

module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = Category.all

        render status: :ok, json: { categories: categories }
      end

      def create
        category = Category.new(category_params)
        category.save!
        render status: :ok, json: {
          notice: "Category was successfully created",
          category: category
        }
      end

      private

        def category_params
          params.require(:category).permit(:name)
        end
    end
  end
end
