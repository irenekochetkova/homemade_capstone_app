class OrdersController < ApplicationController
  def index
    orders = Order.all
    render json: orders.as_json
  end

  def show
    order = Order.find_by(id: params[:id])

    render json: order.as_json
  end

  

end
