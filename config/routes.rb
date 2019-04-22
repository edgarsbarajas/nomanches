Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :words, only: [:create]
      resources :votes, only: [:create, :update, :destroy]
      resources :comments, only: [:create]

      post "/register", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
    end
  end
end
