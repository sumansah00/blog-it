# frozen_string_literal: true

module Api
  module V1
    class OrganizationsController < ApplicationController
      def index
        organizations = Organization.all

        render status: :ok, json: { organizations: organizations }
      end
    end
  end
end
