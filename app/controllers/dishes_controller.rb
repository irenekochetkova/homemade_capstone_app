class DishesController < ApplicationController

  def index
    dishes = Dish.all
    render json: dishes.as_json
  end

end
