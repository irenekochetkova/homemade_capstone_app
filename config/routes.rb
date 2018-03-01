Rails.application.routes.draw do
  
  post "/users" => "users#create"

  get "/dishes" => "dishes#index"

  get "/categories" => "categories#index"

  get "/orders" => "orders#index"

  get "/carted_dishes" => "carted_dishes#index" 



end
