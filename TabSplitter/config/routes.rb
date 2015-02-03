Rails.application.routes.draw do
  root to: "users#new"
  resources :users, only: [:new, :create, :show] do
    resources :tabs, only: [:new, :create, :show, :index]
  end

  # namespace :api, defaults: { format: :json } do
  #   resources :tabs, only: [:new, :create, :show, :index]
  # end

  resource :session, only: [:new, :create, :destroy]

end
