class RemoveAvailabilityFromDish < ActiveRecord::Migration[5.1]
  def change
    remove_column :dishes, :availability, :integer
  end
end
