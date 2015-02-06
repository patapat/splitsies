Rails.application.routes.draw do
  root to: "static_pages#root"


  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :tabs
    resources :users, only: [:new, :create, :show, :index]
  end
end
