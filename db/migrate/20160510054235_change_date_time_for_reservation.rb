class ChangeDateTimeForReservation < ActiveRecord::Migration
  def change
    remove_column :reservations, :start_time
    remove_column :reservations, :end_time
    add_column :reservations, :reserve_date, :date
    add_column :reservations, :start_time, :time
    add_column :reservations, :end_time, :time
  end
end
