class AddForeignKeyToKitchen < ActiveRecord::Migration
  def change
    add_reference :kitchens, :user, index: true
    add_foreign_key :kitchens, :users
  end
end
