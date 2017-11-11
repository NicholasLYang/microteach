Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  resources :exercises
  resources :tutorials
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :projects
  resources :users
  resources :blocks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
