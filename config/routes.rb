Rails.application.routes.draw do
  match "/auth/:provider/callback" => "sessions#create", via: %i(post)
  root to: redirect("/auth/developer")
end
