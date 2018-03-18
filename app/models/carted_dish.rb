class CartedDish < ApplicationRecord
  belongs_to :dish
  belongs_to :user
  belongs_to :order, optional: true



def as_json
  {
    id: id,
    quantity: quantity,
    status: status,
    user: user,
   
    dish: dish.as_json
  }

end

end