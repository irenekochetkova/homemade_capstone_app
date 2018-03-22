class Category < ApplicationRecord
  has_many :dishes


def friendly_dishes
  new_dishes = []
  dishes.each do |dish|
    new_dishes << dish
  end
 new_dishes
end

# def as_json
#   {
#     id: id,
#     title: title,
#     dishes: friendly_dishes
#   }
# end

# def as_json
#   {
#     id: id,
#     title: title
#     # dishes: friendly_dishes
#   }
#   end
  
end