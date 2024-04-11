Rails.application.routes.draw do
  namespace :api do
    resources :features, only: [:index] do
      post 'comments', to: 'features#create_comment'
    end
  end
end
