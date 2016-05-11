class AddForeignKeyToReservation < ActiveRecord::Migration
  def change
    add_reference :reservations, :kitchen, index: true
    add_foreign_key :reservations, :kitchens
  end
end
