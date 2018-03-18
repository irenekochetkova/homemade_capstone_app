class OrdersController < ApplicationController
  def index
    if current_user

    orders = Order.where(user_id: current_user.id)
    render json: orders.as_json
    else

      render json: []
  end
end

  def show
    order = Order.find_by(id: params[:id])
    carted_dishes = order.carted_dishes
    puts order.carted_dishes
    render json: order.as_json
  end


  def create
    order = Order.new(
     user_id: current_user.id
     )
    order.save
    carted_dishes = params[:carted_dishes]
    carted_dishes.each do |carted_dish|
      dish = CartedDish.where(id: carted_dish["id"])
      dish.update(order_id: order.id, status: "Ordered")
    end
  end

end
