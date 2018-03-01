class RemoveZipOfTheUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :zipecode, :integer
  end
end
