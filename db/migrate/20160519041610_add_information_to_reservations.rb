class AddInformationToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :information, :text
  end
end
