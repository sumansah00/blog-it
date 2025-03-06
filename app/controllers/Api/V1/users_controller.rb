# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user_using_x_auth_token, only: :create

      def index
        users = User.select(:id, :name)
        render status: :ok, json: { users: users }
      end

      def create
        user = User.new(user_params)
        user.save!
        render_notice(t("successfully_created", entity: "User"))
      end

      private

        def user_params
          params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_id)
        end
    end
  end
end
