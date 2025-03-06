# frozen_string_literal: true

Rails.application.routes.draw do
  # API routes
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do
        resources :posts, only: %i[index create show], param: :slug
        resources :categories, only: %i[index create]
        resources :organizations, only: %i[index]
      end
    end
  end

  # Frontend routes
  root "home#index"
  get "*path", to: "home#index", via: :all
end
