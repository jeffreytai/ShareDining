class AddForeignKeyToAvailability < ActiveRecord::Migration
  def change
    add_reference :availabilities, :kitchen, index: true
    add_foreign_key :availabilities, :kitchens
  end
end
