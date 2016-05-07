class CreateKitchens < ActiveRecord::Migration
  def change
    create_table :kitchens do |t|

      t.string :title
      t.text :description
      t.string :rental_space

      t.text :washing_station
      t.text :food_preparation
      t.text :cookware
      t.text :storage
      t.text :refrigeration
      t.text :ovens_fryers
      t.text :oven_equipment_and_storage
      t.text :baking_and_pastry
      t.text :other_equipment
      t.text :other_amenities
      t.string :location

      t.text :kitchen_rules_and_instructions
      t.integer :price
      t.text :additional_details
      
      t.timestamps null: false
    end
  end
end
