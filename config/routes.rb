Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :show] do
    resources :tabs
  end

  resource :session, only: [:new, :create, :destroy]
  # namespace :api, defaults: { format: :json } do
  #   resources :tabs
  # end
end
