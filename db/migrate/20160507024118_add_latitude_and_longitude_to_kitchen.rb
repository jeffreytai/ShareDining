class AddLatitudeAndLongitudeToKitchen < ActiveRecord::Migration
  def change
    add_column :kitchens, :latitude, :float
    add_column :kitchens, :longitude, :float
  end
end
