Rails.application.routes.draw do
  get "/oauth2callback" => "sessions#create"
end
