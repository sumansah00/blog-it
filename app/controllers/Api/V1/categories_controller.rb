# frozen_string_literal: true

module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = Category.all

        render status: :ok, json: { categories: categories }
      end
    end
  end
end
