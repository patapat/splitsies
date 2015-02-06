Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :tabs
    resources :users, only: [:new, :create, :show, :index]
    resources :users_friends, only: [:create, :destroy]
    resources :users_tabs, only: [:create, :destroy]
  end
end
