# frozen_string_literal: true

Rails.application.routes.draw do
  # API routes
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do
        resources :posts, except: %i[new edit], param: :slug
        resources :categories, only: %i[index create]
        resources :organizations, only: %i[index]
        resources :users, only: %i[index create]
        resource :session, only: [:create, :destroy]
      end
    end
  end

  # Frontend routes
  root "home#index"
  get "*path", to: "home#index", via: :all
end
