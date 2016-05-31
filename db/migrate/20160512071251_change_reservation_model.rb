class ChangeReservationModel < ActiveRecord::Migration
  def change
    remove_column :reservations, :reserve_date
    remove_column :reservations, :start_time
    remove_column :reservations, :end_time
    add_column :reservations, :schedule, :json
  end
end
