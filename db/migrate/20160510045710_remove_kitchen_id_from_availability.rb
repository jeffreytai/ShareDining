class RemoveKitchenIdFromAvailability < ActiveRecord::Migration
  def change
    remove_column :availabilities, :kitchen_id
  end
end
