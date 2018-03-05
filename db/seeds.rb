CartedDish.create!([
  {user_id: 2, dish_id: 1, order_id: 1, quantity: 3, name: "Russian pancakes", status: "carted"}
])
Category.create!([
  {title: "Russian"}
])
Dish.create!([
  {name: "Russian pancakes", price: "66.0", image_url: "##", description: "pancakes with meat", availability: 10, user_id: 1, category_id: 1}
])
Order.create!([
  {user_id: 2, subtotal: "15.0", tax: "0.0", total: "15.0", zipcode: 94040}
])
User.create!([
  {first_name: "Irene", last_name: "Kochetkova", email: "irene@gmail.com", image_url: "#", phone_number: "650-7272", password_digest: "#", provider: true, zipcode: 94040},
  {first_name: "Victor", last_name: "Kochetkov", email: "victor@gmail.com", image_url: "#", phone_number: "-2986", password_digest: "#", provider: false, zipcode: 94040}
])
