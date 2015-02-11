Rails.application.routes.draw do
  root to: "static_pages#root"
  # root to: "session#new"

  resource :session, only: [:new, :create, :destroy]
  resource :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :tabs
    resources :users, only: [:create, :show, :index]
    resources :users_friends, only: [:create, :destroy, :show, :index]
    resources :users_tabs, only: [:create, :destroy, :show, :index]
  end
end
