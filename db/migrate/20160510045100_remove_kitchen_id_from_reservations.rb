class RemoveKitchenIdFromReservations < ActiveRecord::Migration
  def change
    remove_column :reservations, :kitchen_id
  end
end
