class CreateKitchen < ActiveRecord::Migration
  def change
    create_table :kitchens do |t|
      t.string :name
      t.text :description
      t.string :location
    end
  end
end
