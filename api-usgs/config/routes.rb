Rails.application.routes.draw do
  namespace :api do
    resources :features, only: [:index] do
      post 'comments', to: 'features#create_comment'
      get 'comments', to: 'features#get_comments'
    end
  end
end
