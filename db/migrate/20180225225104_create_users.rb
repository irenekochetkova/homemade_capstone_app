class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :image_url
      t.integer :zipecode
      t.string :phone_number
      t.string :password_digest
      t.boolean :provider

      t.timestamps
    end
  end
end
