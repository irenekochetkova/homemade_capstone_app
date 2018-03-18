class Category < ApplicationRecord
  has_many :dishes


# def as_json
#   {
#     id: id,
#     title: title,
#     dishes: dishes.map { |dish| dish.name }
#   }
# end
  
end