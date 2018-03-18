class Dish < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many :carted_dishes
  has_many :orders, through: :carted_dishes

  validates :name, presence: true, uniqueness: true, length: {minimum: 2}
  validates :price, presence: true
  validates :description, length: {in: 3..500}

  # def tax
  #   price.to_f * 0.1
  # end

  # def total
  #   price.to_f + tax
  # end

  def as_json
    {
      id: id,
      name: name,
      price: price,
      image_url: image_url,
      description: description,
      # tax: tax,
      # total: total,
      user: user,
      category: category
    }
  end

end