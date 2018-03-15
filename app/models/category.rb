class Category < ApplicationRecord
  has_many :dishes
end

def as_json
  {
    id: id,
    title: title
  }
end
  
end