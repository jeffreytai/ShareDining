class AddMultipleToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :multiple, :boolean
  end
end
