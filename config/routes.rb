Rails.application.routes.draw do
  post "/auth/:provider/callback" => "sessions#create"
  resources :docs
  root to: "pages#front"
end
