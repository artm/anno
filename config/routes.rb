Rails.application.routes.draw do
  post "/auth/:provider/callback" => "sessions#create"
  root to: "pages#front"
end
