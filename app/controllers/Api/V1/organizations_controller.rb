# frozen_string_literal: true

module Api
  module V1
    class OrganizationsController < ApplicationController
      skip_before_action :authenticate_user_using_x_auth_token

      def index
        organizations = Organization.all

        render status: :ok, json: { organizations: organizations }
      end
    end
  end
end
