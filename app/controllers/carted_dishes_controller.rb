class CartedDishesController < ApplicationController
  def index
    carted_dishes = CartedDish.where(status: "carted")
    render json: carted_dishes.as_json
  end
end

  def create
    carted_dish = CartedDish.new(
      user_id: current_user.id,
      dish_id: params[:dish_id],
      quantity: params[:quantity],
      status: "created"
      )
    if carted_dish.save
      render json: carted_dish.as_json
    else
      render json: {errors: carted_dish.errors.full_messages}, status: 422
   end
  end