class ChangeReservationUserId < ActiveRecord::Migration
  def change
    rename_column :reservations, :user_id, :renter_id
  end
end
