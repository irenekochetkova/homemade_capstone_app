class DishesController < ApplicationController
  # before_action :authenticate_user


  def index
    dishes = Dish.all
    render json: dishes.as_json
  end

  def show

    dish = Dish.find_by(id: params[:id])

    render json: dish.as_json
  end

  def create
    
    dish = Dish.new(
      name: params[:name],
      price: params[:price],
      image_url: params[:image_url],
      description: params[:description],
      availability: params[:availability],
      user_id: current_user.id,
      category_id: params[:category_id]
      )
    if dish.save
      render json: dish.as_json
    else
      render json: {errors: dish.errors.full_messages}, status: 422

  end
end

  def update
    
    dish = Dish.find_by(id: params[:id]).update(
      name: params[:name] || dish.name,
      price: params[:price] || dish.price,
      image_url: params[:image_url] || dish.image_url,
      description: params[:description] || dish.description,
      availability: params[:availability] || dish.availability,
      
      category_id: params[:category_id] || dish.category_id
      )
    if dish.save
      render json: dish.as_json
    else
      render json: {errors: dish.errors.full_messages}, status: 422

  end
end

  def destroy
    dish = Dish.find_by(id: params[:id]).delete
    render json: {message: "Successfully delete dish."}
  end
 
  

end
