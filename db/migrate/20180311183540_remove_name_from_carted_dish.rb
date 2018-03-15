class RemoveNameFromCartedDish < ActiveRecord::Migration[5.1]
  def change
    remove_column :carted_dishes, :name, :text
  end
end
